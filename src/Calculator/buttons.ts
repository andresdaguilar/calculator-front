const buttons = [
  { label: 'C', type: 'clear', className: 'dark', tooltip: 'Clear' },
  { label: 'RS', type: 'random', className: 'dark', tooltip: 'Randon String' },
  { label: '√', type: 'operator', value: 'sr', className: 'dark', tooltip: 'Square Root' },
  { label: '÷', type: 'operator', value: '/', className: 'operation', tooltip: '' },
  { label: '7', type: 'input', value: '7', className: '', tooltip: '' },
  { label: '8', type: 'input', value: '8', className: '', tooltip: '' },
  { label: '9', type: 'input', value: '7', className: '', tooltip: '' },
  { label: 'x', type: 'operator', value: '*', className: 'operation', tooltip: '' },
  { label: '4', type: 'input', value: '4', className: '', tooltip: '' },
  { label: '5', type: 'input', value: '5',  className: '', tooltip: '' },
  { label: '6', type: 'input', value: '6', className: '', tooltip: '' },
  { label: '-', type: 'operator', value: '-', className: 'operation', tooltip: '' },
  { label: '1', type: 'input', value: '1',  className: '', tooltip: '' },
  { label: '2', type: 'input', value: '2', className: '', tooltip: '' },
  { label: '3', type: 'input', value: '3', className: '', tooltip: '' },
  { label: '+', type: 'operator', value: '+', className: 'operation', tooltip: '' },
  { label: '0', type: 'input', value: '0', className: '', tooltip: '', width: 6 },
  { label: '.', type: 'input', value: '.', className: '', tooltip: '' },
  { label: '=', type: 'calculate', value: '=',  className: 'operation', tooltip: 'Calculate' },
]

export default buttons;