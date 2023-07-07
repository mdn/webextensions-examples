'use strict';


import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import * as core from '@actions/core';
import * as io from '@actions/io';
import { signAddon } from 'sign-addon';
import zipdir from 'zip-dir';

// Required arguments:
const API_KEY = (function () { return function () { return process.env.WEB_EXT_API_KEY; }; }());
const API_SECRET = (function () { return function () { return process.env.WEB_EXT_API_SECRET; }; }());

// Optional arguments:
const CHANNEL = process.env.API_CHANNEL ? process.env.API_CHANNEL : 'unlisted';
const TIMEOUT = process.env.API_TIMEOUT ? process.env.API_TIMEOUT : undefined;
const API_PROXY = process.env.API_PROXY ? process.env.API_PROXY : undefined;
const API_REQUESTCONFIG = process.env.API_REQUESTCONFIG ? process.env.API_REQUESTCONFIG : undefined;
const API_JWTEXPIRESIN = process.env.API_JWTEXPIRESIN ? process.env.API_JWTEXPIRESIN : undefined;
const API_URLPREFIX = process.env.API_URLPREFIX ? process.env.API_URLPREFIX : 'https://addons.mozilla.org/api/v4';

const WORK_DIR = core.toPlatformPath(process.env.WORK_DIR ? process.env.WORK_DIR : './');
const OUTPUT_DIR = core.toPlatformPath(process.env.OUTPUT_DIR ? process.env.OUTPUT_DIR : '.web-ext');

core.setSecret(API_KEY('WEB_EXT_API_KEY'));
core.setSecret(API_SECRET('WEB_EXT_API_SECRET'));

function safeFileName(name) {
    return name.toLowerCase().replace(/[^a-z0-9.-]+/g, '_');
}
const readManifest = async (obj) => {
    const getManifestId = (manifestData) => {
        const manifestApps = [
            manifestData.browser_specific_settings,
            manifestData.applications,
        ];
        for (const apps of manifestApps) {
            if (apps?.gecko) {
                return apps.gecko.id;
            }
        }
        return undefined;
    };

    let dir = obj.dir;
    let manifestData = JSON.parse(readFileSync(path.join(dir, 'manifest.json')));
    obj.manifest_version = manifestData.manifest_version;
    obj.name = manifestData.name;
    obj.version = manifestData.version;
    obj.id = getManifestId(manifestData) ? getManifestId(manifestData) : obj.lastId;
    return obj;
};
const build = async (obj) => {
    let dir = obj.dir;
    let name = obj.name;
    let inPath = path.join(WORK_DIR, dir);
    let outPath = path.join(OUTPUT_DIR, safeFileName(name + '.zip')); // name of output zip file

    await zipdir(inPath, { saveTo: outPath })
        .then((buffer) => {
            const buildTime = Math.round(Date.now() / 1000);
            core.info(`Build SUCCESS:  ${outPath}`);
            core.info(`Build Time:  ${buildTime}`);
            obj.outPath = outPath;
            obj.buildTime = buildTime;
        })
        .catch((err) => {
            core.setFailed(`Build ERROR: ${err}`);
            throw Error(`Build ERROR: ${err}`);
        });
    return obj;
};

const sign = async (obj) => {
    let version = obj.version;
    let outPath = obj.outPath;
    let id = obj.id ? obj.id : '';

    if (!id) {
        let dir = obj.dir;
        core.warning(`${dir} ID.is empty!`);
    }

    let argsObj = {
        // Required arguments:
        xpiPath: outPath,
        version: version,
        apiKey: API_KEY('apiKey'),
        apiSecret: API_SECRET('apiSecret'),

        // Optional arguments:
        id: id,
        // this is a required argument in fact.
        // If not specified,
        // it will take a long time to sign each time,
        // and will generate multiple addons in your AMO account.

        channel: CHANNEL,
        downloadDir: OUTPUT_DIR,
        timeout: TIMEOUT,
        apiProxy: API_PROXY,
        apiRequestConfig: API_REQUESTCONFIG,
        apiJwtExpiresIn: API_JWTEXPIRESIN,
        apiUrlPrefix: API_URLPREFIX,
    };

    const res = await core.group('SignAddon LOG, TLDR!', async () => {
        return await signAddon(argsObj).then(function (result) {
            if (result.success) {
                const { id, downloadedFiles, success } = result;
                const signTime = Math.round(Date.now() / 1000);
                core.info(`Sign SUCCESS: ${success}`);
                core.info(`Sign Time: ${signTime}`);
                core.info(`Your extension ID is: ${id}`);
                obj.lastId = id;
                obj.signTime = signTime;
                obj.dlFile = typeof downloadedFiles === 'string' ? downloadedFiles : downloadedFiles[0];
            } else {
                const { errorCode, errorDetails } = result;
                core.error(`Sign FAIL: ${errorCode} : ${errorDetails}`);
                core.setFailed(`Sign FAIL: ${errorCode} : ${errorDetails}`);
                throw Error('Sign STOP');
            }
            return obj;

        }).catch(function (error) {
            try {
                let res;
                const err_ls = String(error).split('\n');
                for (const e of err_ls) {
                    if (e.startsWith('response')) {
                        res = JSON.parse(e.replace('response: ', ''));
                    }
                }
                core.warning('Sign ERROR: ' + JSON.stringify(res.detail));
            } catch {
                core.error('Sign ERROR: Fail to get response');
            }

            core.error(`Sign ERROR: ${error}`);
            core.setFailed(`Sign ERROR: ${error}`);
            throw Error('Sign STOP');
        });
    });
    return res;
};

const rename = async (obj) => {
    const { name, version, buildTime, dlFile } = obj;
    const destPath = path.join(OUTPUT_DIR, safeFileName([name, version, buildTime].join('_') + '.xpi'));

    await io.mv(core.toPlatformPath(dlFile), destPath);
    core.info(`Rename SUCCESS: ${destPath}`);
    obj.destPath = destPath;
    return obj;
};

const readData = (dir) => {
    let obj;
    const file = safeFileName(`${dir}.json`);
    try {
        const rf = JSON.parse(readFileSync(path.join(OUTPUT_DIR, file)));

        if (typeof rf === 'object') {
            obj = rf;
            core.info(`readData SUCCESS: ${file} \n ${JSON.stringify(obj)}`);
        } else {
            obj = { 'dir': dir };
            core.warning(`readData Init: ${JSON.stringify(obj)}`);
        }
    } catch (err) {
        core.warning(`readData ERROR: ${file} \n ${err}`);
        obj = { 'dir': dir };
        core.warning(`readData Init: ${JSON.stringify(obj)}`);
    } finally {
        return obj;
    }
};

const writeData = (obj) => {
    const dir = obj.dir;
    const file = safeFileName(`${dir}.json`);
    try {
        writeFileSync(path.join(OUTPUT_DIR, file), JSON.stringify(obj));
        core.info(`writeData Done. ${file}`);
        core.setOutput('data', JSON.stringify(obj));
        core.setOutput('done', 'true');
    } catch (err) {
        core.warning(`writeData ERROR:  ${file} \n ${err}`);
    }
};

const main = async (obj) => {
    obj = await readManifest(obj);
    obj = await build(obj);
    obj = await sign(obj);
    obj = await rename(obj);
    return obj;
};

const argv = process.argv.slice(2);

for (let dir of argv) {
    core.info(`Sign - START - ${dir}`);
    let obj = readData(dir);

    obj = await main(obj);

    writeData(obj);
    core.info(`Sign - END - ${dir}`);
}


export { main as defaults };
