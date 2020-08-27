
export const tipitakaGuide = new Map([
  ['Sutta', '/discourses'],
  ['Vinaya', '/vinaya'],
  ['Abhidhamma', '/abhidhamma'],
]);

export const pitakaGuide = new Map([
  ['Long', '/dn-guide-sujato'],
  ['Middle', '/mn-guide-sujato'],
  ['Linked', '/sn-guide-sujato'],
  ['Numbered', '/an-guide-sujato']
]);

export const navIndex = new Map([
  ['home', {
    index: 0,
    position: 0,
    pathParamIndex: 2,
    navArrayLength: 1
  }],
  ['pitaka', {
    index: 1,
    position: 1,
    pathParamIndex: 2,
    navArrayLength: 2
  }],
  ['parallels', {
    index: 2,
    position: 2,
    pathParamIndex: 2,
    navArrayLength: 3
  }],
  ['vaggas', {
    index: 3,
    position: 3,
    pathParamIndex: 2,
    navArrayLength: 4
  }],
  ['vagga', {
    index: 4,
    position: 4,
    pathParamIndex: -1,
    navArrayLength: 5
  }],
  ['vaggaChildren', {
    index: 5,
    position: 5,
    pathParamIndex: -1,
    navArrayLength: 6
  }],
  
  ['vaggaChildrenChildren', {
    index: 6,
    position: 6,
    pathParamIndex: -1,
    navArrayLength: 7
  }],

  ['sutta', {
    index: 7,
    position: 7,
    pathParamIndex: -1,
    navArrayLength: 8
  }],
  ['staticPage', {
    index: 1,
    position: 1,
    pathParamIndex: -1,
    navArrayLength: 2
  }],
]);