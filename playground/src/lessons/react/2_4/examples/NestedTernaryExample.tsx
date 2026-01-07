// @ts-nocheck
// Nested ternaries (use sparingly!)
const status = 'online';

const statusText =
  status === 'online'
    ? '🟢 Available'
    : status === 'away'
      ? '🟡 Away'
      : status === 'busy'
        ? '🔴 Busy'
        : '⚫ Offline';
