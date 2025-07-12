export const hoardSequenceTypes = ['Repeat', 'Numbered', 'Infinite'] as const;
export type HoardSequenceType = typeof hoardSequenceTypes[number];
