import ora, { Ora, Options } from 'ora';

export function createSpinner(options?: string | Options): Ora {
  const defaultOptions: Options = {
    indent: 2,
    color: 'cyan'
  };

  const finalOptions = typeof options === 'string' 
    ? { ...defaultOptions, text: options } 
    : { ...defaultOptions, ...options };

  return ora(finalOptions);
}
