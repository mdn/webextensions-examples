 (async function main() { 
  if (browser.telemetry.canUpload()) {
    const EVENT_CATEGORY = 'commerce.addon';
    
    // Submit test event telemetry ping
    await browser.telemetry.registerEvents(EVENT_CATEGORY, {
      test: {
        methods: ['test_method'],
        objects: ['test_arg'],
        extra_keys: [],
      },
    });
    try {
      await browser.telemetry.recordEvent(EVENT_CATEGORY, 'test_method', 'test_arg', null, null);
    } catch(error) {
      console.war(`recordEvent failed with error: ${error}`);
    }

    // Submit test scalar ping
    await browser.telemetry.registerScalars(EVENT_CATEGORY, {
      num_test: {
        kind: 'count',
        record_on_release: true,
      },
    });
    try {
      await browser.telemetry.scalarSet(`${EVENT_CATEGORY}.num_test`, 1);
    } catch(error) {
      console.warn(`scalarAdd failed with error: ${error}`);
    }
  }
}());