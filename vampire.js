class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0
    let vamp = this;

    while (vamp.creator) {
      numberOfVamps++;
      vamp = vamp.creator;
    }

    return numberOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let senior = this;
    let junior = vampire;
    if (!this.isMoreSeniorThan(vampire)) {
      senior = vampire;
      junior = this;
    }
    
    let ancestors1 = [senior];
    let vamp = senior;

    while (vamp.creator) {
      ancestors1.push(vamp.creator);
      vamp = vamp.creator
    }

    vamp = junior;
    let ancestors2 = [junior];
    
    while (vamp.creator) {
      ancestors2.push(vamp.creator);
      vamp = vamp.creator
    }

    for (let i of ancestors1) {
      for (let j of ancestors2) {
        if (i === j) {
          return i;
        }
      }
    }
    
  }
}

module.exports = Vampire;

