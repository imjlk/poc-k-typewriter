/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Typewriter.tsx":
/*!****************************!*\
  !*** ./src/Typewriter.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useUniTyper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useUniTyper */ "./src/useUniTyper.ts");


function TypeWriter(props) {
  const [displayedText, state] = (0,_useUniTyper__WEBPACK_IMPORTED_MODULE_1__["default"])(props);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, displayedText));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypeWriter);

/***/ }),

/***/ "./src/useUniTyper.ts":
/*!****************************!*\
  !*** ./src/useUniTyper.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useUniTyper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _beavercoding_uni_typer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @beavercoding/uni-typer */ "./node_modules/.pnpm/@beavercoding+uni-typer@1.0.1/node_modules/@beavercoding/uni-typer/dist/index.mjs");


const initialTypeWriterState = {
  disassembledText: [],
  flatIndex: 0,
  isForwarding: true
};
function updateStateForwarding(prev) {
  const {
    disassembledText,
    flatIndex
  } = prev;
  const nextFlatIndex = flatIndex + 1;
  const nextIsForwarding = nextFlatIndex < disassembledText.length;
  return {
    ...prev,
    flatIndex: nextFlatIndex,
    isForwarding: nextIsForwarding
  };
}
function updateStateBackwarding(prev) {
  const {
    flatIndex
  } = prev;
  const nextFlatIndex = flatIndex - 1;
  const nextIsForwarding = nextFlatIndex > 0;
  return {
    ...prev,
    flatIndex: Math.max(nextFlatIndex, 0),
    isForwarding: nextIsForwarding
  };
}
function useUniTyper(props) {
  const {
    texts,
    pauseDelay = 1000,
    typeDelay = 100,
    deleteDelay = 10
  } = props;
  const [textIndex, setTextIndex] = react__WEBPACK_IMPORTED_MODULE_0___default().useState({
    index: 0,
    max: texts.length
  });
  const text = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(() => texts[textIndex.index], [textIndex.index, texts]);
  const disassembledText = textIndex.max === 1 ? (0,_beavercoding_uni_typer__WEBPACK_IMPORTED_MODULE_1__.decompose)(text) : react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(() => {
    return (0,_beavercoding_uni_typer__WEBPACK_IMPORTED_MODULE_1__.decompose)(text);
  }, [text]);

  // console.log(textIndex.index, texts[textIndex.index]);

  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(() => ({
    ...initialTypeWriterState,
    disassembledText
  }));
  const delay = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(() => {
    const fullFlatLength = disassembledText.flat().length;
    const nextIndex = state.flatIndex + 1;
    const isLastCharacter = nextIndex === fullFlatLength + 1;
    const prevIndex = state.flatIndex - 1;
    const isFirstCharacter = prevIndex === -1;
    const nextIsForwarding = isFirstCharacter || state.isForwarding && !isFirstCharacter && !isLastCharacter;
    if (isLastCharacter || isFirstCharacter) {
      return pauseDelay;
    }
    if (nextIsForwarding) {
      return typeDelay;
    }
    return deleteDelay;
  }, [disassembledText, state.flatIndex, state.isForwarding, deleteDelay, pauseDelay, typeDelay]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
    const timeout = setTimeout(() => {
      setState(prev => {
        const fullFlatLength = disassembledText.flat().length;
        const nextIndex = prev.flatIndex + 1;
        const isLastCharacter = nextIndex === fullFlatLength + 1;
        const prevIndex = prev.flatIndex - 1;
        const isFirstCharacter = prevIndex === -1;
        const next = prev.isForwarding ? updateStateForwarding(prev) : updateStateBackwarding(prev);
        const nextIsForwarding = isFirstCharacter || prev.isForwarding && !isFirstCharacter && !isLastCharacter;

        // console.log({nextIndex, fullFlatLength, nextIsForwarding, prevIndex});

        if (!prev.isForwarding && nextIsForwarding) {
          setTextIndex(prev => ({
            ...prev,
            index: (prev.index + 1) % prev.max
          }));
        }
        return {
          ...next,
          isForwarding: nextIsForwarding
        };
      });
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [disassembledText, state.flatIndex, delay]);
  const displayedText = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(() => (0,_beavercoding_uni_typer__WEBPACK_IMPORTED_MODULE_1__.combine)(disassembledText.slice(0, state.flatIndex).map(v => v.decomposedAtIndex)), [disassembledText, state]);
  return [displayedText, state];
}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "./node_modules/.pnpm/@beavercoding+uni-typer@1.0.1/node_modules/@beavercoding/uni-typer/dist/index.mjs":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@beavercoding+uni-typer@1.0.1/node_modules/@beavercoding/uni-typer/dist/index.mjs ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chosungIncludes: () => (/* binding */ chosungIncludes),
/* harmony export */   combine: () => (/* binding */ combine),
/* harmony export */   combineHangul: () => (/* binding */ combineHangul),
/* harmony export */   decompose: () => (/* binding */ decompose),
/* harmony export */   decomposeHangul: () => (/* binding */ decomposeHangul),
/* harmony export */   excerptJong: () => (/* binding */ excerptJong),
/* harmony export */   excerptJung: () => (/* binding */ excerptJung),
/* harmony export */   isHangul: () => (/* binding */ isHangul),
/* harmony export */   josa: () => (/* binding */ josa),
/* harmony export */   removeJong: () => (/* binding */ removeJong),
/* harmony export */   removeJungAndJong: () => (/* binding */ removeJungAndJong)
/* harmony export */ });
// http://unicode.org/Public/UNIDATA/Blocks.txt
const UNICODE_BLOCKS = [
    [
        0x0000,
        0x007f,
        "Basic Latin"
    ],
    [
        0x0080,
        0x00ff,
        "Latin-1 Supplement"
    ],
    [
        0x0100,
        0x017f,
        "Latin Extended-A"
    ],
    [
        0x0180,
        0x024f,
        "Latin Extended-B"
    ],
    [
        0x0250,
        0x02af,
        "IPA Extensions"
    ],
    [
        0x02b0,
        0x02ff,
        "Spacing Modifier Letters"
    ],
    [
        0x0300,
        0x036f,
        "Combining Diacritical Marks"
    ],
    [
        0x0370,
        0x03ff,
        "Greek and Coptic"
    ],
    [
        0x0400,
        0x04ff,
        "Cyrillic"
    ],
    [
        0x0500,
        0x052f,
        "Cyrillic Supplement"
    ],
    [
        0x0530,
        0x058f,
        "Armenian"
    ],
    [
        0x0590,
        0x05ff,
        "Hebrew"
    ],
    [
        0x0600,
        0x06ff,
        "Arabic"
    ],
    [
        0x0700,
        0x074f,
        "Syriac"
    ],
    [
        0x0750,
        0x077f,
        "Arabic Supplement"
    ],
    [
        0x0780,
        0x07bf,
        "Thaana"
    ],
    [
        0x07c0,
        0x07ff,
        "NKo"
    ],
    [
        0x0800,
        0x083f,
        "Samaritan"
    ],
    [
        0x0840,
        0x085f,
        "Mandaic"
    ],
    [
        0x0860,
        0x086f,
        "Syriac Supplement"
    ],
    [
        0x0870,
        0x089f,
        "Arabic Extended-B"
    ],
    [
        0x08a0,
        0x08ff,
        "Arabic Extended-A"
    ],
    [
        0x0900,
        0x097f,
        "Devanagari"
    ],
    [
        0x0980,
        0x09ff,
        "Bengali"
    ],
    [
        0x0a00,
        0x0a7f,
        "Gurmukhi"
    ],
    [
        0x0a80,
        0x0aff,
        "Gujarati"
    ],
    [
        0x0b00,
        0x0b7f,
        "Oriya"
    ],
    [
        0x0b80,
        0x0bff,
        "Tamil"
    ],
    [
        0x0c00,
        0x0c7f,
        "Telugu"
    ],
    [
        0x0c80,
        0x0cff,
        "Kannada"
    ],
    [
        0x0d00,
        0x0d7f,
        "Malayalam"
    ],
    [
        0x0d80,
        0x0dff,
        "Sinhala"
    ],
    [
        0x0e00,
        0x0e7f,
        "Thai"
    ],
    [
        0x0e80,
        0x0eff,
        "Lao"
    ],
    [
        0x0f00,
        0x0fff,
        "Tibetan"
    ],
    [
        0x1000,
        0x109f,
        "Myanmar"
    ],
    [
        0x10a0,
        0x10ff,
        "Georgian"
    ],
    [
        0x1100,
        0x11ff,
        "Hangul Jamo"
    ],
    [
        0x1200,
        0x137f,
        "Ethiopic"
    ],
    [
        0x1380,
        0x139f,
        "Ethiopic Supplement"
    ],
    [
        0x13a0,
        0x13ff,
        "Cherokee"
    ],
    [
        0x1400,
        0x167f,
        "Unified Canadian Aboriginal Syllabics"
    ],
    [
        0x1680,
        0x169f,
        "Ogham"
    ],
    [
        0x16a0,
        0x16ff,
        "Runic"
    ],
    [
        0x1700,
        0x171f,
        "Tagalog"
    ],
    [
        0x1720,
        0x173f,
        "Hanunoo"
    ],
    [
        0x1740,
        0x175f,
        "Buhid"
    ],
    [
        0x1760,
        0x177f,
        "Tagbanwa"
    ],
    [
        0x1780,
        0x17ff,
        "Khmer"
    ],
    [
        0x1800,
        0x18af,
        "Mongolian"
    ],
    [
        0x18b0,
        0x18ff,
        "Unified Canadian Aboriginal Syllabics Extended"
    ],
    [
        0x1900,
        0x194f,
        "Limbu"
    ],
    [
        0x1950,
        0x197f,
        "Tai Le"
    ],
    [
        0x1980,
        0x19df,
        "New Tai Lue"
    ],
    [
        0x19e0,
        0x19ff,
        "Khmer Symbols"
    ],
    [
        0x1a00,
        0x1a1f,
        "Buginese"
    ],
    [
        0x1a20,
        0x1aaf,
        "Tai Tham"
    ],
    [
        0x1ab0,
        0x1aff,
        "Combining Diacritical Marks Extended"
    ],
    [
        0x1b00,
        0x1b7f,
        "Balinese"
    ],
    [
        0x1b80,
        0x1bbf,
        "Sundanese"
    ],
    [
        0x1bc0,
        0x1bff,
        "Batak"
    ],
    [
        0x1c00,
        0x1c4f,
        "Lepcha"
    ],
    [
        0x1c50,
        0x1c7f,
        "Ol Chiki"
    ],
    [
        0x1c80,
        0x1c8f,
        "Cyrillic Extended-C"
    ],
    [
        0x1c90,
        0x1cbf,
        "Georgian Extended"
    ],
    [
        0x1cc0,
        0x1ccf,
        "Sundanese Supplement"
    ],
    [
        0x1cd0,
        0x1cff,
        "Vedic Extensions"
    ],
    [
        0x1d00,
        0x1d7f,
        "Phonetic Extensions"
    ],
    [
        0x1d80,
        0x1dbf,
        "Phonetic Extensions Supplement"
    ],
    [
        0x1dc0,
        0x1dff,
        "Combining Diacritical Marks Supplement"
    ],
    [
        0x1e00,
        0x1eff,
        "Latin Extended Additional"
    ],
    [
        0x1f00,
        0x1fff,
        "Greek Extended"
    ],
    [
        0x2000,
        0x206f,
        "General Punctuation"
    ],
    [
        0x2070,
        0x209f,
        "Superscripts and Subscripts"
    ],
    [
        0x20a0,
        0x20cf,
        "Currency Symbols"
    ],
    [
        0x20d0,
        0x20ff,
        "Combining Diacritical Marks for Symbols"
    ],
    [
        0x2100,
        0x214f,
        "Letterlike Symbols"
    ],
    [
        0x2150,
        0x218f,
        "Number Forms"
    ],
    [
        0x2190,
        0x21ff,
        "Arrows"
    ],
    [
        0x2200,
        0x22ff,
        "Mathematical Operators"
    ],
    [
        0x2300,
        0x23ff,
        "Miscellaneous Technical"
    ],
    [
        0x2400,
        0x243f,
        "Control Pictures"
    ],
    [
        0x2440,
        0x245f,
        "Optical Character Recognition"
    ],
    [
        0x2460,
        0x24ff,
        "Enclosed Alphanumerics"
    ],
    [
        0x2500,
        0x257f,
        "Box Drawing"
    ],
    [
        0x2580,
        0x259f,
        "Block Elements"
    ],
    [
        0x25a0,
        0x25ff,
        "Geometric Shapes"
    ],
    [
        0x2600,
        0x26ff,
        "Miscellaneous Symbols"
    ],
    [
        0x2700,
        0x27bf,
        "Dingbats"
    ],
    [
        0x27c0,
        0x27ef,
        "Miscellaneous Mathematical Symbols-A"
    ],
    [
        0x27f0,
        0x27ff,
        "Supplemental Arrows-A"
    ],
    [
        0x2800,
        0x28ff,
        "Braille Patterns"
    ],
    [
        0x2900,
        0x297f,
        "Supplemental Arrows-B"
    ],
    [
        0x2980,
        0x29ff,
        "Miscellaneous Mathematical Symbols-B"
    ],
    [
        0x2a00,
        0x2aff,
        "Supplemental Mathematical Operators"
    ],
    [
        0x2b00,
        0x2bff,
        "Miscellaneous Symbols and Arrows"
    ],
    [
        0x2c00,
        0x2c5f,
        "Glagolitic"
    ],
    [
        0x2c60,
        0x2c7f,
        "Latin Extended-C"
    ],
    [
        0x2c80,
        0x2cff,
        "Coptic"
    ],
    [
        0x2d00,
        0x2d2f,
        "Georgian Supplement"
    ],
    [
        0x2d30,
        0x2d7f,
        "Tifinagh"
    ],
    [
        0x2d80,
        0x2ddf,
        "Ethiopic Extended"
    ],
    [
        0x2de0,
        0x2dff,
        "Cyrillic Extended-A"
    ],
    [
        0x2e00,
        0x2e7f,
        "Supplemental Punctuation"
    ],
    [
        0x2e80,
        0x2eff,
        "CJK Radicals Supplement"
    ],
    [
        0x2f00,
        0x2fdf,
        "Kangxi Radicals"
    ],
    [
        0x2ff0,
        0x2fff,
        "Ideographic Description Characters"
    ],
    [
        0x3000,
        0x303f,
        "CJK Symbols and Punctuation"
    ],
    [
        0x3040,
        0x309f,
        "Hiragana"
    ],
    [
        0x30a0,
        0x30ff,
        "Katakana"
    ],
    [
        0x3100,
        0x312f,
        "Bopomofo"
    ],
    [
        0x3130,
        0x318f,
        "Hangul Compatibility Jamo"
    ],
    [
        0x3190,
        0x319f,
        "Kanbun"
    ],
    [
        0x31a0,
        0x31bf,
        "Bopomofo Extended"
    ],
    [
        0x31c0,
        0x31ef,
        "CJK Strokes"
    ],
    [
        0x31f0,
        0x31ff,
        "Katakana Phonetic Extensions"
    ],
    [
        0x3200,
        0x32ff,
        "Enclosed CJK Letters and Months"
    ],
    [
        0x3300,
        0x33ff,
        "CJK Compatibility"
    ],
    [
        0x3400,
        0x4dbf,
        "CJK Unified Ideographs Extension A"
    ],
    [
        0x4dc0,
        0x4dff,
        "Yijing Hexagram Symbols"
    ],
    [
        0x4e00,
        0x9fff,
        "CJK Unified Ideographs"
    ],
    [
        0xa000,
        0xa48f,
        "Yi Syllables"
    ],
    [
        0xa490,
        0xa4cf,
        "Yi Radicals"
    ],
    [
        0xa4d0,
        0xa4ff,
        "Lisu"
    ],
    [
        0xa500,
        0xa63f,
        "Vai"
    ],
    [
        0xa640,
        0xa69f,
        "Cyrillic Extended-B"
    ],
    [
        0xa6a0,
        0xa6ff,
        "Bamum"
    ],
    [
        0xa700,
        0xa71f,
        "Modifier Tone Letters"
    ],
    [
        0xa720,
        0xa7ff,
        "Latin Extended-D"
    ],
    [
        0xa800,
        0xa82f,
        "Syloti Nagri"
    ],
    [
        0xa830,
        0xa83f,
        "Common Indic Number Forms"
    ],
    [
        0xa840,
        0xa87f,
        "Phags-pa"
    ],
    [
        0xa880,
        0xa8df,
        "Saurashtra"
    ],
    [
        0xa8e0,
        0xa8ff,
        "Devanagari Extended"
    ],
    [
        0xa900,
        0xa92f,
        "Kayah Li"
    ],
    [
        0xa930,
        0xa95f,
        "Rejang"
    ],
    [
        0xa960,
        0xa97f,
        "Hangul Jamo Extended-A"
    ],
    [
        0xa980,
        0xa9df,
        "Javanese"
    ],
    [
        0xa9e0,
        0xa9ff,
        "Myanmar Extended-B"
    ],
    [
        0xaa00,
        0xaa5f,
        "Cham"
    ],
    [
        0xaa60,
        0xaa7f,
        "Myanmar Extended-A"
    ],
    [
        0xaa80,
        0xaadf,
        "Tai Viet"
    ],
    [
        0xaae0,
        0xaaff,
        "Meetei Mayek Extensions"
    ],
    [
        0xab00,
        0xab2f,
        "Ethiopic Extended-A"
    ],
    [
        0xab30,
        0xab6f,
        "Latin Extended-E"
    ],
    [
        0xab70,
        0xabbf,
        "Cherokee Supplement"
    ],
    [
        0xabc0,
        0xabff,
        "Meetei Mayek"
    ],
    [
        0xac00,
        0xd7af,
        "Hangul Syllables"
    ],
    [
        0xd7b0,
        0xd7ff,
        "Hangul Jamo Extended-B"
    ],
    [
        0xd800,
        0xdb7f,
        "High Surrogates"
    ],
    [
        0xdb80,
        0xdbff,
        "High Private Use Surrogates"
    ],
    [
        0xdc00,
        0xdfff,
        "Low Surrogates"
    ],
    [
        0xe000,
        0xf8ff,
        "Private Use Area"
    ],
    [
        0xf900,
        0xfaff,
        "CJK Compatibility Ideographs"
    ],
    [
        0xfb00,
        0xfb4f,
        "Alphabetic Presentation Forms"
    ],
    [
        0xfb50,
        0xfdff,
        "Arabic Presentation Forms-A"
    ],
    [
        0xfe00,
        0xfe0f,
        "Variation Selectors"
    ],
    [
        0xfe10,
        0xfe1f,
        "Vertical Forms"
    ],
    [
        0xfe20,
        0xfe2f,
        "Combining Half Marks"
    ],
    [
        0xfe30,
        0xfe4f,
        "CJK Compatibility Forms"
    ],
    [
        0xfe50,
        0xfe6f,
        "Small Form Variants"
    ],
    [
        0xfe70,
        0xfeff,
        "Arabic Presentation Forms-B"
    ],
    [
        0xff00,
        0xffef,
        "Halfwidth and Fullwidth Forms"
    ],
    [
        0xfff0,
        0xffff,
        "Specials"
    ],
    [
        0x10000,
        0x1007f,
        "Linear B Syllabary"
    ],
    [
        0x10080,
        0x100ff,
        "Linear B Ideograms"
    ],
    [
        0x10100,
        0x1013f,
        "Aegean Numbers"
    ],
    [
        0x10140,
        0x1018f,
        "Ancient Greek Numbers"
    ],
    [
        0x10190,
        0x101cf,
        "Ancient Symbols"
    ],
    [
        0x101d0,
        0x101ff,
        "Phaistos Disc"
    ],
    [
        0x10280,
        0x1029f,
        "Lycian"
    ],
    [
        0x102a0,
        0x102df,
        "Carian"
    ],
    [
        0x102e0,
        0x102ff,
        "Coptic Epact Numbers"
    ],
    [
        0x10300,
        0x1032f,
        "Old Italic"
    ],
    [
        0x10330,
        0x1034f,
        "Gothic"
    ],
    [
        0x10350,
        0x1037f,
        "Old Permic"
    ],
    [
        0x10380,
        0x1039f,
        "Ugaritic"
    ],
    [
        0x103a0,
        0x103df,
        "Old Persian"
    ],
    [
        0x10400,
        0x1044f,
        "Deseret"
    ],
    [
        0x10450,
        0x1047f,
        "Shavian"
    ],
    [
        0x10480,
        0x104af,
        "Osmanya"
    ],
    [
        0x104b0,
        0x104ff,
        "Osage"
    ],
    [
        0x10500,
        0x1052f,
        "Elbasan"
    ],
    [
        0x10530,
        0x1056f,
        "Caucasian Albanian"
    ],
    [
        0x10570,
        0x105bf,
        "Vithkuqi"
    ],
    [
        0x10600,
        0x1077f,
        "Linear A"
    ],
    [
        0x10780,
        0x107bf,
        "Latin Extended-F"
    ],
    [
        0x10800,
        0x1083f,
        "Cypriot Syllabary"
    ],
    [
        0x10840,
        0x1085f,
        "Imperial Aramaic"
    ],
    [
        0x10860,
        0x1087f,
        "Palmyrene"
    ],
    [
        0x10880,
        0x108af,
        "Nabataean"
    ],
    [
        0x108e0,
        0x108ff,
        "Hatran"
    ],
    [
        0x10900,
        0x1091f,
        "Phoenician"
    ],
    [
        0x10920,
        0x1093f,
        "Lydian"
    ],
    [
        0x10980,
        0x1099f,
        "Meroitic Hieroglyphs"
    ],
    [
        0x109a0,
        0x109ff,
        "Meroitic Cursive"
    ],
    [
        0x10a00,
        0x10a5f,
        "Kharoshthi"
    ],
    [
        0x10a60,
        0x10a7f,
        "Old South Arabian"
    ],
    [
        0x10a80,
        0x10a9f,
        "Old North Arabian"
    ],
    [
        0x10ac0,
        0x10aff,
        "Manichaean"
    ],
    [
        0x10b00,
        0x10b3f,
        "Avestan"
    ],
    [
        0x10b40,
        0x10b5f,
        "Inscriptional Parthian"
    ],
    [
        0x10b60,
        0x10b7f,
        "Inscriptional Pahlavi"
    ],
    [
        0x10b80,
        0x10baf,
        "Psalter Pahlavi"
    ],
    [
        0x10c00,
        0x10c4f,
        "Old Turkic"
    ],
    [
        0x10c80,
        0x10cff,
        "Old Hungarian"
    ],
    [
        0x10d00,
        0x10d3f,
        "Hanifi Rohingya"
    ],
    [
        0x10e60,
        0x10e7f,
        "Rumi Numeral Symbols"
    ],
    [
        0x10e80,
        0x10ebf,
        "Yezidi"
    ],
    [
        0x10ec0,
        0x10eff,
        "Arabic Extended-C"
    ],
    [
        0x10f00,
        0x10f2f,
        "Old Sogdian"
    ],
    [
        0x10f30,
        0x10f6f,
        "Sogdian"
    ],
    [
        0x10f70,
        0x10faf,
        "Old Uyghur"
    ],
    [
        0x10fb0,
        0x10fdf,
        "Chorasmian"
    ],
    [
        0x10fe0,
        0x10fff,
        "Elymaic"
    ],
    [
        0x11000,
        0x1107f,
        "Brahmi"
    ],
    [
        0x11080,
        0x110cf,
        "Kaithi"
    ],
    [
        0x110d0,
        0x110ff,
        "Sora Sompeng"
    ],
    [
        0x11100,
        0x1114f,
        "Chakma"
    ],
    [
        0x11150,
        0x1117f,
        "Mahajani"
    ],
    [
        0x11180,
        0x111df,
        "Sharada"
    ],
    [
        0x111e0,
        0x111ff,
        "Sinhala Archaic Numbers"
    ],
    [
        0x11200,
        0x1124f,
        "Khojki"
    ],
    [
        0x11280,
        0x112af,
        "Multani"
    ],
    [
        0x112b0,
        0x112ff,
        "Khudawadi"
    ],
    [
        0x11300,
        0x1137f,
        "Grantha"
    ],
    [
        0x11400,
        0x1147f,
        "Newa"
    ],
    [
        0x11480,
        0x114df,
        "Tirhuta"
    ],
    [
        0x11580,
        0x115ff,
        "Siddham"
    ],
    [
        0x11600,
        0x1165f,
        "Modi"
    ],
    [
        0x11660,
        0x1167f,
        "Mongolian Supplement"
    ],
    [
        0x11680,
        0x116cf,
        "Takri"
    ],
    [
        0x11700,
        0x1174f,
        "Ahom"
    ],
    [
        0x11800,
        0x1184f,
        "Dogra"
    ],
    [
        0x118a0,
        0x118ff,
        "Warang Citi"
    ],
    [
        0x11900,
        0x1195f,
        "Dives Akuru"
    ],
    [
        0x119a0,
        0x119ff,
        "Nandinagari"
    ],
    [
        0x11a00,
        0x11a4f,
        "Zanabazar Square"
    ],
    [
        0x11a50,
        0x11aaf,
        "Soyombo"
    ],
    [
        0x11ab0,
        0x11abf,
        "Unified Canadian Aboriginal Syllabics Extended-A"
    ],
    [
        0x11ac0,
        0x11aff,
        "Pau Cin Hau"
    ],
    [
        0x11b00,
        0x11b5f,
        "Devanagari Extended-A"
    ],
    [
        0x11c00,
        0x11c6f,
        "Bhaiksuki"
    ],
    [
        0x11c70,
        0x11cbf,
        "Marchen"
    ],
    [
        0x11d00,
        0x11d5f,
        "Masaram Gondi"
    ],
    [
        0x11d60,
        0x11daf,
        "Gunjala Gondi"
    ],
    [
        0x11ee0,
        0x11eff,
        "Makasar"
    ],
    [
        0x11f00,
        0x11f5f,
        "Kawi"
    ],
    [
        0x11fb0,
        0x11fbf,
        "Lisu Supplement"
    ],
    [
        0x11fc0,
        0x11fff,
        "Tamil Supplement"
    ],
    [
        0x12000,
        0x123ff,
        "Cuneiform"
    ],
    [
        0x12400,
        0x1247f,
        "Cuneiform Numbers and Punctuation"
    ],
    [
        0x12480,
        0x1254f,
        "Early Dynastic Cuneiform"
    ],
    [
        0x12f90,
        0x12fff,
        "Cypro-Minoan"
    ],
    [
        0x13000,
        0x1342f,
        "Egyptian Hieroglyphs"
    ],
    [
        0x13430,
        0x1345f,
        "Egyptian Hieroglyph Format Controls"
    ],
    [
        0x14400,
        0x1467f,
        "Anatolian Hieroglyphs"
    ],
    [
        0x16800,
        0x16a3f,
        "Bamum Supplement"
    ],
    [
        0x16a40,
        0x16a6f,
        "Mro"
    ],
    [
        0x16a70,
        0x16acf,
        "Tangsa"
    ],
    [
        0x16ad0,
        0x16aff,
        "Bassa Vah"
    ],
    [
        0x16b00,
        0x16b8f,
        "Pahawh Hmong"
    ],
    [
        0x16e40,
        0x16e9f,
        "Medefaidrin"
    ],
    [
        0x16f00,
        0x16f9f,
        "Miao"
    ],
    [
        0x16fe0,
        0x16fff,
        "Ideographic Symbols and Punctuation"
    ],
    [
        0x17000,
        0x187ff,
        "Tangut"
    ],
    [
        0x18800,
        0x18aff,
        "Tangut Components"
    ],
    [
        0x18b00,
        0x18cff,
        "Khitan Small Script"
    ],
    [
        0x18d00,
        0x18d7f,
        "Tangut Supplement"
    ],
    [
        0x1aff0,
        0x1afff,
        "Kana Extended-B"
    ],
    [
        0x1b000,
        0x1b0ff,
        "Kana Supplement"
    ],
    [
        0x1b100,
        0x1b12f,
        "Kana Extended-A"
    ],
    [
        0x1b130,
        0x1b16f,
        "Small Kana Extension"
    ],
    [
        0x1b170,
        0x1b2ff,
        "Nushu"
    ],
    [
        0x1bc00,
        0x1bc9f,
        "Duployan"
    ],
    [
        0x1bca0,
        0x1bcaf,
        "Shorthand Format Controls"
    ],
    [
        0x1cf00,
        0x1cfcf,
        "Znamenny Musical Notation"
    ],
    [
        0x1d000,
        0x1d0ff,
        "Byzantine Musical Symbols"
    ],
    [
        0x1d100,
        0x1d1ff,
        "Musical Symbols"
    ],
    [
        0x1d200,
        0x1d24f,
        "Ancient Greek Musical Notation"
    ],
    [
        0x1d2c0,
        0x1d2df,
        "Kaktovik Numerals"
    ],
    [
        0x1d2e0,
        0x1d2ff,
        "Mayan Numerals"
    ],
    [
        0x1d300,
        0x1d35f,
        "Tai Xuan Jing Symbols"
    ],
    [
        0x1d360,
        0x1d37f,
        "Counting Rod Numerals"
    ],
    [
        0x1d400,
        0x1d7ff,
        "Mathematical Alphanumeric Symbols"
    ],
    [
        0x1d800,
        0x1daaf,
        "Sutton SignWriting"
    ],
    [
        0x1df00,
        0x1dfff,
        "Latin Extended-G"
    ],
    [
        0x1e000,
        0x1e02f,
        "Glagolitic Supplement"
    ],
    [
        0x1e030,
        0x1e08f,
        "Cyrillic Extended-D"
    ],
    [
        0x1e100,
        0x1e14f,
        "Nyiakeng Puachue Hmong"
    ],
    [
        0x1e290,
        0x1e2bf,
        "Toto"
    ],
    [
        0x1e2c0,
        0x1e2ff,
        "Wancho"
    ],
    [
        0x1e4d0,
        0x1e4ff,
        "Nag Mundari"
    ],
    [
        0x1e7e0,
        0x1e7ff,
        "Ethiopic Extended-B"
    ],
    [
        0x1e800,
        0x1e8df,
        "Mende Kikakui"
    ],
    [
        0x1e900,
        0x1e95f,
        "Adlam"
    ],
    [
        0x1ec70,
        0x1ecbf,
        "Indic Siyaq Numbers"
    ],
    [
        0x1ed00,
        0x1ed4f,
        "Ottoman Siyaq Numbers"
    ],
    [
        0x1ee00,
        0x1eeff,
        "Arabic Mathematical Alphabetic Symbols"
    ],
    [
        0x1f000,
        0x1f02f,
        "Mahjong Tiles"
    ],
    [
        0x1f030,
        0x1f09f,
        "Domino Tiles"
    ],
    [
        0x1f0a0,
        0x1f0ff,
        "Playing Cards"
    ],
    [
        0x1f100,
        0x1f1ff,
        "Enclosed Alphanumeric Supplement"
    ],
    [
        0x1f200,
        0x1f2ff,
        "Enclosed Ideographic Supplement"
    ],
    [
        0x1f300,
        0x1f5ff,
        "Miscellaneous Symbols and Pictographs"
    ],
    [
        0x1f600,
        0x1f64f,
        "Emoticons"
    ],
    [
        0x1f650,
        0x1f67f,
        "Ornamental Dingbats"
    ],
    [
        0x1f680,
        0x1f6ff,
        "Transport and Map Symbols"
    ],
    [
        0x1f700,
        0x1f77f,
        "Alchemical Symbols"
    ],
    [
        0x1f780,
        0x1f7ff,
        "Geometric Shapes Extended"
    ],
    [
        0x1f800,
        0x1f8ff,
        "Supplemental Arrows-C"
    ],
    [
        0x1f900,
        0x1f9ff,
        "Supplemental Symbols and Pictographs"
    ],
    [
        0x1fa00,
        0x1fa6f,
        "Chess Symbols"
    ],
    [
        0x1fa70,
        0x1faff,
        "Symbols and Pictographs Extended-A"
    ],
    [
        0x1fb00,
        0x1fbff,
        "Symbols for Legacy Computing"
    ],
    [
        0x20000,
        0x2a6df,
        "CJK Unified Ideographs Extension B"
    ],
    [
        0x2a700,
        0x2b73f,
        "CJK Unified Ideographs Extension C"
    ],
    [
        0x2b740,
        0x2b81f,
        "CJK Unified Ideographs Extension D"
    ],
    [
        0x2b820,
        0x2ceaf,
        "CJK Unified Ideographs Extension E"
    ],
    [
        0x2ceb0,
        0x2ebef,
        "CJK Unified Ideographs Extension F"
    ],
    [
        0x2ebf0,
        0x2ee5f,
        "CJK Unified Ideographs Extension I"
    ],
    [
        0x2f800,
        0x2fa1f,
        "CJK Compatibility Ideographs Supplement"
    ],
    [
        0x30000,
        0x3134f,
        "CJK Unified Ideographs Extension G"
    ],
    [
        0x31350,
        0x323af,
        "CJK Unified Ideographs Extension H"
    ],
    [
        0xe0000,
        0xe007f,
        "Tags"
    ],
    [
        0xe0100,
        0xe01ef,
        "Variation Selectors Supplement"
    ],
    [
        0xf0000,
        0xfffff,
        "Supplementary Private Use Area-A"
    ],
    [
        0x100000,
        0x10ffff,
        "Supplementary Private Use Area-B"
    ]
];
function getUnicodeBlock(input, blocks = UNICODE_BLOCKS) {
    const sanitized = typeof input === "string" ? input : "";
    return sanitized.split("").map((char)=>{
        const code = char.charCodeAt(0);
        if (code === undefined) {
            return {
                char,
                block: "Unknown"
            };
        }
        const block = blocks.find(([start, end])=>code >= start && code <= end);
        if (block === undefined) {
            return {
                char,
                block: "Unknown"
            };
        }
        return {
            char,
            block: block[2]
        };
    });
}
function getReducedUnicodeBlocks(blockNames) {
    if (typeof blockNames === "string") {
        return UNICODE_BLOCKS.filter((block)=>block[2].includes(blockNames));
    }
    return UNICODE_BLOCKS.filter((block)=>blockNames.some((name)=>block[2].includes(name)));
}
function isInBlock(blockNames) {
    return (input)=>{
        if (typeof input !== "string") {
            return false;
        }
        if (input.length < 1) {
            return false;
        }
        return getUnicodeBlock(input, getReducedUnicodeBlocks(blockNames)).every((v)=>v.block !== "Unknown");
    };
}

// Inspired by https://github.com/e-/Hangul.js
const CHO = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ"
];
/* Disassembled 중성(nucleus) */ const JUNG = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    [
        "ㅘ",
        "ㅗ",
        "ㅏ"
    ],
    [
        "ㅙ",
        "ㅗ",
        "ㅐ"
    ],
    [
        "ㅚ",
        "ㅗ",
        "ㅣ"
    ],
    "ㅛ",
    "ㅜ",
    [
        "ㅝ",
        "ㅜ",
        "ㅓ"
    ],
    [
        "ㅞ",
        "ㅜ",
        "ㅔ"
    ],
    [
        "ㅟ",
        "ㅜ",
        "ㅣ"
    ],
    "ㅠ",
    "ㅡ",
    [
        "ㅢ",
        "ㅡ",
        "ㅣ"
    ],
    "ㅣ"
];
/* Desassembled 종성(coda) */ const JONG = [
    "",
    "ㄱ",
    "ㄲ",
    [
        "ㄳ",
        "ㄱ",
        "ㅅ"
    ],
    "ㄴ",
    [
        "ㄵ",
        "ㄴ",
        "ㅈ"
    ],
    [
        "ㄶ",
        "ㄴ",
        "ㅎ"
    ],
    "ㄷ",
    "ㄹ",
    [
        "ㄺ",
        "ㄹ",
        "ㄱ"
    ],
    [
        "ㄻ",
        "ㄹ",
        "ㅁ"
    ],
    [
        "ㄼ",
        "ㄹ",
        "ㅂ"
    ],
    [
        "ㄽ",
        "ㄹ",
        "ㅅ"
    ],
    [
        "ㄾ",
        "ㄹ",
        "ㅌ"
    ],
    [
        "ㄿ",
        "ㄹ",
        "ㅍ"
    ],
    [
        "ㅀ",
        "ㄹ",
        "ㅎ"
    ],
    "ㅁ",
    "ㅂ",
    [
        "ㅄ",
        "ㅂ",
        "ㅅ"
    ],
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ"
];
/* 유니코드 한글 (Hangul Syllables) 시작 위치 */ const HANGUL_OFFSET = 0xac00;
/* 복잡한 자음: [ 자음1+자음2, 자음1, 자음2  ] */ /* 복잡한 모음: [모음1+모음2, 모음1, 모음2] */ const COMPLEX_CONSONANTS = [
    [
        "ㄳ",
        "ㄱ",
        "ㅅ"
    ],
    [
        "ㄵ",
        "ㄴ",
        "ㅈ"
    ],
    [
        "ㄶ",
        "ㄴ",
        "ㅎ"
    ],
    [
        "ㄺ",
        "ㄹ",
        "ㄱ"
    ],
    [
        "ㄻ",
        "ㄹ",
        "ㅁ"
    ],
    [
        "ㄼ",
        "ㄹ",
        "ㅂ"
    ],
    [
        "ㄽ",
        "ㄹ",
        "ㅅ"
    ],
    [
        "ㄾ",
        "ㄹ",
        "ㅌ"
    ],
    [
        "ㄿ",
        "ㄹ",
        "ㅍ"
    ],
    [
        "ㅀ",
        "ㄹ",
        "ㅎ"
    ],
    [
        "ㅄ",
        "ㅂ",
        "ㅅ"
    ]
];
const COMPLEX_VOWELS = [
    [
        "ㅘ",
        "ㅗ",
        "ㅏ"
    ],
    [
        "ㅙ",
        "ㅗ",
        "ㅐ"
    ],
    [
        "ㅚ",
        "ㅗ",
        "ㅣ"
    ],
    [
        "ㅝ",
        "ㅜ",
        "ㅓ"
    ],
    [
        "ㅞ",
        "ㅜ",
        "ㅔ"
    ],
    [
        "ㅟ",
        "ㅜ",
        "ㅣ"
    ],
    [
        "ㅢ",
        "ㅡ",
        "ㅣ"
    ]
];
const COMPLEXES = [
    ...COMPLEX_CONSONANTS,
    ...COMPLEX_VOWELS
];
function getFromTable(table, index) {
    const selected = table[index];
    if (Array.isArray(selected)) {
        return selected[0];
    }
    return selected;
}
function removeJungAndJong(input) {
    if (input.length !== 1) {
        throw new Error("Input must be a single character.");
    }
    const unicode = input.charCodeAt(0);
    if (isInBlock("Hangul Syllables")(input)) {
        const code = unicode - HANGUL_OFFSET;
        const jong = code % 28;
        const jung = Math.floor((code - jong) / 28) % 21;
        return String.fromCharCode(unicode - jong - jung * 28);
    }
    return input;
}
function removeJong(input) {
    if (typeof input !== "string") {
        throw new Error("Input must be a string.");
    }
    if (input.length !== 1) {
        throw new Error("Input must be a single character.");
    }
    const unicode = input.charCodeAt(0);
    if (isInBlock("Hangul Syllables")(input)) {
        const code = unicode - HANGUL_OFFSET;
        const jong = code % 28;
        return String.fromCharCode(unicode - jong);
    }
    return input;
}
function excerptJung(input) {
    const sanitized = typeof input !== "string" ? "" : input.length > 1 ? input[0] : input;
    const unicode = sanitized.charCodeAt(0);
    if (isInBlock("Hangul Syllables")(sanitized)) {
        const code = unicode - HANGUL_OFFSET;
        const jung = Math.floor((code - code % 28) / 28) % 21;
        return typeof JUNG[jung] === "string" ? JUNG[jung] : JUNG[jung][0];
    }
    return "";
}
function excerptJong(input) {
    const sanitized = typeof input !== "string" ? "" : input.length > 1 ? input[0] : input;
    const unicode = sanitized.charCodeAt(0);
    if (isInBlock("Hangul Syllables")(sanitized)) {
        const code = unicode - HANGUL_OFFSET;
        const jong = code % 28;
        return typeof JONG[jong] === "string" ? JONG[jong] : JONG[jong][0];
    }
    return "";
}
function isHangul(input) {
    return getUnicodeBlock(input, getReducedUnicodeBlocks("Hangul")).every((v)=>v.block !== "Unknown");
}
function decomposeHangul(singleChar) {
    if (singleChar.length !== 1) {
        throw new Error("Input must be a single character.");
    }
    const unicode = singleChar.charCodeAt(0);
    // 완성형 한글 11172자 = 19 × 21 × (27 +1) = 11172
    // 참고: https://namu.wiki/w/%ED%98%84%EB%8C%80%20%ED%95%9C%EA%B8%80%EC%9D%98%20%EB%AA%A8%EB%93%A0%20%EA%B8%80%EC%9E%90
    if (isInBlock("Hangul Syllables")(singleChar)) {
        const code = unicode - HANGUL_OFFSET;
        const jong = code % 28;
        const jung = Math.floor((code - jong) / 28) % 21;
        const cho = Math.floor((code - jong) / 28 / 21);
        return [
            CHO[cho],
            getFromTable(JUNG, jung),
            getFromTable(JONG, jong)
        ].filter((v)=>v !== "" && typeof v === "string").flatMap((v)=>decomposeHangul(v));
    }
    if (isInBlock([
        "Hangul Jamo",
        "Hangul Compatibility Jamo",
        "Hangul Jamo Extended-A",
        "Hangul Jamo Extended-B"
    ])(singleChar)) {
        const complex = COMPLEXES.find((v)=>v[0] === singleChar);
        return complex ? [
            ...complex.slice(1)
        ] : [
            singleChar
        ];
    }
    return [
        singleChar
    ];
}
function combineHangul(input) {
    return input.reduce((acc, cur, index)=>{
        // if the cur is not hangul, add and skip
        if (!isHangul(cur)) {
            return {
                ...acc,
                result: [
                    ...acc.result,
                    cur
                ],
                last: cur,
                index
            };
        }
        const typed = acc.result[acc.result.length - 1];
        if (typeof typed !== "string") {
            return {
                ...acc,
                result: [
                    ...acc.result,
                    cur
                ],
                last: cur,
                index
            };
        }
        // (자음 + 단/복모음 + 단자음) + 단자음 => 한글자
        if (isInBlock("Hangul Syllables")(typed) && JONG.findIndex((v)=>v[1] === excerptJong(typed) && v[2] === cur) > -1) {
            const code = removeJong(typed).charCodeAt(0);
            const complexIndex = JONG.findIndex((v)=>typeof v !== "string" && v[1] === excerptJong(typed) && v[2] === cur);
            const result = String.fromCharCode(code + complexIndex);
            return {
                ...acc,
                result: [
                    ...acc.result.slice(0, acc.result.length - 1),
                    result
                ],
                last: cur,
                index
            };
        }
        // (자음 + 모음 + 단자음) + 모음 => 두글자
        if (isInBlock("Hangul Syllables")(typed) && (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 !== 0 && JONG.findIndex((v)=>typeof v !== "string" && v[0] === excerptJong(typed)) === -1 && JUNG.includes(cur)) {
            const jongRemoved = removeJong(typed);
            const jong = excerptJong(typed);
            const choIndex = CHO.indexOf(jong);
            const jungIndex = JUNG.indexOf(cur);
            const result = String.fromCharCode(HANGUL_OFFSET + choIndex * 21 * 28 + jungIndex * 28);
            return {
                ...acc,
                result: [
                    ...acc.result.slice(0, acc.result.length - 1),
                    jongRemoved,
                    result
                ],
                last: cur,
                index
            };
        }
        // (자음 + 모음 + 복자음) + 모음 => 두글자
        if (isInBlock("Hangul Syllables")(typed) && (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 !== 0 && JONG.findIndex((v)=>typeof v !== "string" && v[0] === excerptJong(typed)) > -1 && JUNG.includes(cur)) {
            const jongRemoved = removeJong(typed);
            const jong = excerptJong(typed);
            const combinedIndex = JONG.findIndex((v)=>typeof v !== "string" && v[0] === jong);
            const [_, badchim, choseong] = JONG[combinedIndex];
            const badchimIndex = JONG.indexOf(badchim);
            const choIndex = CHO.indexOf(choseong);
            const jungIndex = JUNG.indexOf(cur);
            const prev = String.fromCharCode(jongRemoved.charCodeAt(0) + badchimIndex);
            const next = String.fromCharCode(HANGUL_OFFSET + choIndex * 21 * 28 + jungIndex * 28);
            return {
                ...acc,
                result: [
                    ...acc.result.slice(0, acc.result.length - 1),
                    prev,
                    next
                ],
                last: cur,
                index
            };
        }
        // (자음 + 모음) + 모음 => (자음 + 복모음)
        const maybeComplexVowelIndex = JUNG.findIndex((v)=>typeof v !== "string" && v[1] === excerptJung(typed) && v[2] === cur);
        if (isInBlock("Hangul Syllables")(typed) && (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 === 0 && maybeComplexVowelIndex > -1) {
            const choCode = Math.floor((typed.charCodeAt(0) - HANGUL_OFFSET) / (28 * 21)) * (28 * 21) + HANGUL_OFFSET; // 자음 + ㅏ 위치 찾기
            const result = String.fromCharCode(choCode + maybeComplexVowelIndex * 28);
            return {
                ...acc,
                result: [
                    ...acc.result.slice(0, acc.result.length - 1),
                    result
                ],
                last: cur,
                index
            };
        }
        // (자음 + 단/복모음) + 자음 => 한글자
        if (isInBlock("Hangul Syllables")(typed) && (typed.charCodeAt(0) - HANGUL_OFFSET) % 28 === 0 && // (초성 + 중성)
        JONG.includes(cur)) {
            const result = String.fromCharCode(typed.charCodeAt(0) + JONG.indexOf(cur));
            return {
                ...acc,
                result: [
                    ...acc.result.slice(0, acc.result.length - 1),
                    result
                ],
                last: cur,
                index
            };
        }
        // 자음 + 단모음
        if (CHO.includes(typed) && JUNG.includes(cur)) {
            const choIndex = CHO.indexOf(typed);
            const jungIndex = JUNG.indexOf(cur);
            const result = String.fromCharCode(HANGUL_OFFSET + choIndex * 21 * 28 + jungIndex * 28);
            return {
                ...acc,
                result: [
                    ...acc.result.slice(0, acc.result.length - 1),
                    result
                ],
                last: cur,
                index
            };
        }
        return {
            ...acc,
            result: [
                ...acc.result,
                cur
            ],
            last: cur,
            index
        };
    }, {
        input,
        result: [],
        last: "",
        index: -1
    }).result.join("");
}
// Inspired by es-hangul, TOSS
function chosungIncludes(target, chosung) {
    if (chosung.length > target.length) {
        return false;
    }
    const targetOnlyHangul = target.split("").filter((c)=>isHangul(c)).join("");
    const chosungOnlyHangul = chosung.split("").filter((c)=>isHangul(c)).join("");
    const chosungDecomposed = decompose(chosungOnlyHangul, "detail");
    if (chosungDecomposed.length !== chosung.length) {
        return false;
    }
    const chosungArr = chosungDecomposed.reduce((acc, cur)=>{
        if (cur.decomposedIndex === 0) {
            return [
                ...acc,
                cur.decomposedAtIndex
            ];
        }
        return acc;
    }, []);
    const result = decompose(targetOnlyHangul, "detail").reduce((acc, _cur, index, arr)=>{
        if (acc) {
            return true;
        }
        if (index + chosungArr.length > arr.length) {
            return false;
        }
        const ahead = arr.filter((v)=>v.decomposedIndex === 0).slice(index, index + chosungArr.length).map((v)=>v);
        if (ahead.length === 0) {
            return false;
        }
        if (ahead.length > 0 && ahead.every((v, i)=>v.decomposedAtIndex === chosungArr[i])) {
            return true;
        }
        return acc;
    }, false);
    return result;
}
function josa(word, josa) {
    const lastChar = word[word.length - 1];
    const lastCharDecomposed = decompose(lastChar, "detail");
    if (lastCharDecomposed.length === 0) {
        return word;
    }
    const lastCharJong = lastCharDecomposed[lastCharDecomposed.length - 1];
    if (CHO.includes(lastCharJong.decomposedAtIndex)) {
        return word + josa.split("/")[0];
    }
    return word + josa.split("/")[1];
}

function simpleDecompose(input) {
    return input.split("").flatMap((c)=>{
        if (c === " ") {
            return [
                " "
            ];
        }
        // if c is Hangul, decompose again with hangulSimpleDecompose function
        if (isHangul(c)) {
            return decomposeHangul(c);
        }
        // NFKD is a Unicode normalization form that decomposes characters;
        // NOT RECOMMENDED.
        return c.normalize("NFKD").split("");
    });
}
function decompose(input, mode = "detail") {
    if (mode === "simple") {
        return simpleDecompose(input);
    }
    const result = input.split("").map((char, charIndex, arr)=>({
            wordBeforeCharIndex: arr.slice(0, charIndex).join(""),
            char,
            charIndex,
            decomposedSingle: simpleDecompose(char)
        })).flatMap((detail)=>detail.decomposedSingle.map((v, i)=>({
                ...detail,
                currentWord: input,
                flatIndex: 0,
                decomposedAtIndex: v,
                decomposedIndex: i
            }))).map((v, i)=>({
            ...v,
            flatIndex: i
        }));
    return result;
}

function combine(input) {
    if (input.some((char)=>isInBlock("Hangul")(char))) {
        return combineHangul(input);
    }
    return input;
}


//# sourceMappingURL=index.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/view.tsx ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Typewriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Typewriter */ "./src/Typewriter.tsx");

//@ts-ignore


window.addEventListener('load', function () {
  document.querySelectorAll('.wp-block-create-block-k-typewriter .typewriter-container').forEach(blockDomElement => {
    const attributes = JSON.parse(
    // @ts-ignore
    blockDomElement.dataset.gutenbergAttributes);
    const root = (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot)(blockDomElement);
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Typewriter__WEBPACK_IMPORTED_MODULE_2__["default"], {
      texts: attributes.testToggle ? attributes.texts : [attributes.text],
      pauseDelay: 1000,
      typeDelay: 50,
      deleteDelay: 30
    }));
  });
}, false);
/******/ })()
;
//# sourceMappingURL=view.js.map