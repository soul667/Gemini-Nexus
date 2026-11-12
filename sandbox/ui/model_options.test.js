// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { DEFAULT_OFFICIAL_MODEL, DEFAULT_OFFICIAL_MODELS } from '../../shared/config/constants.js';
import { createModelOptions } from './model_options.js';

describe('model options', () => {
    it('lists Gemini 4 Carbon on the official provider without changing the default model', () => {
        expect(DEFAULT_OFFICIAL_MODEL).toBe('gemini-3.8-flash');
        expect(DEFAULT_OFFICIAL_MODELS.split(',')[0].trim()).toBe('gemini-3.8-flash');

        expect(
            createModelOptions({
                provider: 'official',
                officialModel: DEFAULT_OFFICIAL_MODELS,
            })
        ).toEqual([
            { value: 'gemini-3.8-flash', label: 'gemini-3.8-flash' },
            { value: 'gemini-3.5-flash-lite', label: 'gemini-3.5-flash-lite' },
            { value: 'gemini-4-carbon', label: 'Gemini 4 Carbon' },
        ]);
    });

    it('keeps Gemini 4 Carbon out of the Gemini Web catalog', () => {
        const webOptions = createModelOptions({ provider: 'web' });

        expect(webOptions.map((option) => option.value)).not.toContain('gemini-4-carbon');
        expect(webOptions.map((option) => option.label)).not.toContain('Gemini 4 Carbon');
        expect(webOptions.map((option) => option.label)).toContain('4 Argon');
    });
});
