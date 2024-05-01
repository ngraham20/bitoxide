/** @param {NS} ns */
export async function main(ns) {

    // level 0
    let lvl0 = ns.read("level0servers.txt");
    let lvl0connections = lvl0.split(/\n/);
    for (const con of lvl0connections) {
        if (con) {
            ns.tprint("Accessing: " + con);
            ns.nuke(con);
            cast_botnet(ns, con);
        }
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("BruteSSH.exe")) {
        await ns.sleep(60000);
    }

    // level 1
    let lvl1 = ns.read("level1servers.txt");
    let lvl1connections = lvl1.split(/\n/);
    for (const con of lvl1connections) {
        if (con) {
            ns.tprint("Accessing: " + con);
            ns.brutessh(con);
            ns.nuke(con);
            cast_botnet(ns, con);
        }
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("FTPCrack.exe")) {
        await ns.sleep(60000);
    }

    // level 2
    let lvl2 = ns.read("level2servers.txt");
    let lvl2connections = lvl2.split(/\n/);
    for (const con of lvl2connections) {
        if (con) {
            ns.tprint("Accessing: " + con);
            ns.brutessh(con);
            ns.ftpcrack(con);
            ns.nuke(con);
            cast_botnet(ns, con);
        }
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("RelaySMTP.exe")) {
        await ns.sleep(60000);
    }

    let lvl3 = ns.read("level3servers.txt");
    let lvl3connections = lvl3.split(/\n/);
    for (const con of lvl3connections) {
        if (con) {
            ns.tprint("Accessing: " + con);
            ns.brutessh(con);
            ns.ftpcrack(con);
            ns.relaysmtp(con);
            ns.nuke(con);
            cast_botnet(ns, con);
        }
    }
}
/** @param {NS} ns */
function cast_botnet(ns, con) {
  let botnet = "dynamic-hack.js";
  let maxRam = ns.getServerMaxRam(con);
  let requiredRam = ns.getScriptRam(botnet, "home");
  let numThreads = Math.trunc(maxRam / requiredRam);
  ns.scp(botnet, con);
  ns.killall(con);
  ns.exec(botnet, con, numThreads);
}