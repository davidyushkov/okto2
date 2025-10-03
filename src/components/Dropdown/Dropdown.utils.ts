export const getDropdownLabel = (placeholder: string, value: string[]) =>
    value.length === 0 ? placeholder : value.join(', ');


