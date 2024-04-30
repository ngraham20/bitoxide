/** @param {NS} ns */
export async function main(ns) {
    let orders = ns.args[0];
    if (orders) {
      ns.clearPort(25565);
      ns.writePort(25565, orders);
    }
  }