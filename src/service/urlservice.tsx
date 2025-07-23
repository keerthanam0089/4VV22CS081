type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type LogPackage = 'hook' | 'component' | 'api';

interface LogPayload {
  stack: 'frontend';
  level: LogLevel;
  package: LogPackage;
  message: string;
  [key: string]: any;
}

export async function logEvent(
  level: LogLevel,
  pkg: LogPackage,
  message: string,
  extra?: Record<string, any>
) {
  const payload: LogPayload = {
    stack: 'frontend',
    level,
    package: pkg,
    message,
    ...extra
  };

  try {
    await fetch('http://localhost:3000/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {
    // Optionally handle error (do not use console.log)
  }
}