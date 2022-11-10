const looseJsonParse = (obj: string) =>
    Function(`"use strict";return (${obj})`)();

export default looseJsonParse;
