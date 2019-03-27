import { version } from "../package.json";
import LazyObserver from "./lazy-observer";

function lazy() {}

lazy.create = (options) => new LazyObserver(options);

lazy.VERSION = version;

export default lazy;
