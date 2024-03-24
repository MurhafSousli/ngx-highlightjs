export enum LoaderErrors {
  FULL_WITH_CORE_LIBRARY_IMPORTS = 'The full library and the core library were imported, only one of them should be imported!',
  FULL_WITH_LANGUAGE_IMPORTS = 'The highlighting languages were imported they are not needed!',
  CORE_WITHOUT_LANGUAGE_IMPORTS = 'The highlighting languages were not imported!',
  LANGUAGE_WITHOUT_CORE_IMPORTS = 'The core library was not imported!',
  NO_FULL_AND_NO_CORE_IMPORTS = 'Highlight.js library was not imported!',
}
