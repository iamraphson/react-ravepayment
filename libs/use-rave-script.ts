import {useState, useEffect} from 'react';

// TODO: Provide an error if the user is trying to initialize the two mode concurrently
// For example when a user has already loaded in development and then trying to load in production there should be an error to warn the user

const cachedScripts: string[] = [];

export default function useRaveScript(production: boolean): boolean[] {
  const src = !production
    ? 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js'
    : 'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js';
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    // If cachedScripts array already includes src that means another instance ...
    // ... of this hook already loaded this script, so no need to load again.
      function loadScript() {
          if (cachedScripts.includes(src)) {
              setState({
                  loaded: true,
                  error: false,
              });
              return (): any => {};
          } else {
              cachedScripts.push(src);

              // Create script
              const script = document.createElement('script');
              script.src = src;
              script.async = true;

              const onScriptLoad = (): void => {
                  setState({
                      loaded: true,
                      error: false,
                  });
              };

              const onScriptError = (): void => {
                  const index = cachedScripts.indexOf(src);
                  if (index >= 0) cachedScripts.splice(index, 1);
                  script.remove();

                  setState({
                      loaded: true,
                      error: true,
                  });
              };

              script.addEventListener('load', onScriptLoad);
              script.addEventListener('complete', onScriptLoad);
              script.addEventListener('error', onScriptError);
              document.body.appendChild(script);
              return (): void => {
                  script.removeEventListener('load', onScriptLoad);
                  script.removeEventListener('error', onScriptError);
              };
          }
      };

      loadScript();
  }, []);

  return [state.loaded, state.error];
}
