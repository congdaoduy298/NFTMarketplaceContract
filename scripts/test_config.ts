import * as Config from "./config"

async function main () {
    await Config.initConfig();
    Config.setConfig("bsctest" + ".Floppy", "123")
    await Config.updateConfig();
}

main()