// @ts-ignore
import {renderHook, cleanup} from '@testing-library/react-hooks';
import useRaveScript from '../use-rave-script';

describe('useRaveScripts() with development mode', () => {
  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('adds the script to the dom', () => {
    const {result} = renderHook(() => useRaveScript(false));
    expect(result.current[0]).toBe(false);
    expect(document.getElementsByTagName('script')).toBeDefined();
  });

  it('should not attach multiple script', () => {
    renderHook(() => useRaveScript(false));
    renderHook(() => useRaveScript(false));
    expect(document.getElementsByTagName('script').length).toBe(1);
  });

  it('should return loaded as true because the previous script has been loaded', () => {
    const {result} = renderHook(() => useRaveScript(false));
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(false);
  });
  it('should load the correct script', () => {
    expect(document.body.innerHTML).toMatch(
      'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js',
    );
  });
});

describe('useRaveScripts() with production mode', () => {
  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('adds the script to the dom', () => {
    const {result} = renderHook(() => useRaveScript(true));
    expect(result.current[0]).toBe(false);
    expect(document.getElementsByTagName('script')).toBeDefined();
  });

  it('should not attach multiple script', () => {
    renderHook(() => useRaveScript(true));
    renderHook(() => useRaveScript(true));
    expect(document.getElementsByTagName('script').length).toBe(1);
  });

  it('should load the correct script', () => {
    expect(document.body.innerHTML).toMatch(
      'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js',
    );
  });
});
