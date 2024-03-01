const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to
    this.leftReport = null;
    this.rightReport = null;
  }

  assignOfficer(officerId, officerName) {
    // your solution here
    if (this.officerId == null) {
      this.officerId = officerId;
      this.officerName = officerName;
    } else if (officerId < this.officerId) {
      if (this.leftReport == null) {
        this.leftReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.leftReport.assignOfficer(officerId, officerName);
      }
    } else {
      if (this.rightReport == null) {
        this.rightReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.rightReport.assignOfficer(officerId, officerName);
      }
    }
  }

  // return the leaf nodes
  findOfficersWithNoDirectReports(values = []) {
    // your solution here
    if (this.leftReport == null && this.rightReport == null) {
      values = [this.officerName, ...values];
    } else if (this.leftReport && this.rightReport) {
      values = [
        ...this.leftReport.findOfficersWithNoDirectReports(values),
        ...this.rightReport.findOfficersWithNoDirectReports(values),
        ...values,
      ];
    } else if (this.leftReport != null) {
      values = [
        ...this.leftReport.findOfficersWithNoDirectReports(values),
        ...values,
      ];
    } else if (this.rightReport != null) {
      values = [
        ...this.rightReport.findOfficersWithNoDirectReports(values),
        ...values,
      ];
    }
    return values;
  }

  listOfficersByExperience(officerNames = []) {
    if (this.rightReport) {
      officerNames = this.rightReport.listOfficersByExperience(officerNames);
    }
    officerNames.push(this.officerName);
    if (this.leftReport) {
      officerNames = this.leftReport.listOfficersByExperience(officerNames);
    }
    return officerNames;
  }

  listOfficersByRank(tree, rankedOfficers = {}) {
    const queue = new Queue();
    let depth = 1;
    queue.enqueue(tree); 
    let node = queue.dequeue(); 
    while (node) {
      depth = 1;
      let checker = node.reportTo;
      while (checker) {
        depth++;
        checker = checker.reportTo;
      }
      if (!rankedOfficers[depth]) {
        rankedOfficers[depth] = [];
      }
      rankedOfficers[depth].push(node.officerName); 
      if (node.rightReport) {
        queue.enqueue(node.rightReport);
      }

      if (node.leftReport) {
        queue.enqueue(node.leftReport); 
      }
      node = queue.dequeue();
    }
    console.log(rankedOfficers);
    return rankedOfficers;
  }
}

module.exports = StarshipEnterprise;