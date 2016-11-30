var Path = {};
Path.base       = __dirname + '/..';
Path.src        = {};
Path.src.base   = Path.base + "/assets"
Path.src.icons  = Path.src.base  + "/icons";
Path.src.styles = Path.src.base  + "/styles";
Path.src.fonts  = Path.src.base  + "/fonts";
Path.src.app    = Path.base + "/app"

module.exports = Path;
