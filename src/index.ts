import { main } from "./main";
import { test } from "./test";


declare const global: {
  [x: string]: unknown;
};

global.main = main;
global.test = test;
