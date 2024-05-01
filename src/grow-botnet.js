/** @param {NS} ns */
export async function main(ns) {
    let porthackfiles = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
    let portcracks = [ns.brutessh, ns.ftpcrack, ns.relaysmtp, ns.httpworm, ns.sqlinject];
    let maxlevel = 5;

    let i = 0;
    let lvlfile = ns.read("level"+i+"servers.txt");
    let lvlconnections = lvlfile.split(/\n/);
    for (const con of lvlconnections) {
        if (con) {
            ns.tprint("Accessing: " + con);
            ns.nuke(con);
            initialize(ns, con);
        }
    }
    
    for(let level = 1; level <= maxlevel; level++) {
        while(!ns.fileExists(porthackfiles[level-1])) {
            await ns.sleep(60000);
        }
        let lvlfile = ns.read("level"+level+"servers.txt");
        let lvlconnections = lvlfile.split(/\n/);
        for (const con of lvlconnections) {
            if (con) {
                ns.tprint("Accessing: " + con);

                // execute all cracks up to the current level
                for(let program = 0; program < level; program++) {
                    portcracks[program](con);
                }

                // finally, nuke and initialize
                ns.nuke(con);
                initialize(ns, con);
            }
        }
    }
}
/** @param {NS} ns */
function initialize(ns, con) {
    let botnet = "dynamic-hack.js";
    let maxRam = ns.getServerMaxRam(con);
    let requiredRam = ns.getScriptRam(botnet, "home");
    let numThreads = 0;
    if (requiredRam) {
        numThreads = Math.trunc(maxRam / requiredRam);
    }
    if (numThreads) {
        ns.scp(botnet, con);
        ns.killall(con);
        ns.exec(botnet, con, numThreads);
    }
}