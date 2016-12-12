#!/usr/bin/env python3

import sys
import json
import struct

# Read a message from stdin and decode it.
def getMessage():
  rawLength = sys.stdin.buffer.read(4)
  if len(rawLength) == 0:
      sys.exit(0)
  messageLength = struct.unpack('@I', rawLength)[0]
  message = sys.stdin.buffer.read(messageLength).decode('utf-8')
  return json.loads(message)

# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
  encodedContent = json.dumps(messageContent).encode('utf-8')
  encodedLength = struct.pack('@I', len(encodedContent))
  return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout
def sendMessage(encodedMessage):
  sys.stdout.buffer.write(encodedMessage['length'])
  sys.stdout.buffer.write(encodedMessage['content'])
  sys.stdout.buffer.flush()

while True:
  receivedMessage = getMessage()
  if (receivedMessage == "ping"):
    sendMessage(encodeMessage("pong"))
