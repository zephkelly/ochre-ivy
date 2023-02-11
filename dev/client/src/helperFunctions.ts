export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export function formatString(string: string, charLimit: number = 0) {
  if (string == null || string == '') { return ''; }

  let validateString = string.replace(/<br>/g, ' ');
  
  validateString = validateString.replace(/(\r\n|\n|\r)/gm, '');
  validateString = validateString.replace(/<script>.*<\/script>/g, '');
  validateString = validateString.replace(/&lt;.*?&gt;/g, '');
  validateString = validateString.replace(/&lt;script.*?;.*?&lt;\/script&gt;/g, '');
  validateString = validateString.replace(/&lt;script.*?&lt;\/script&gt;/g, '');
  validateString = validateString.replace(/&lt;script.*?&gt;/g, '');
  validateString = validateString.replace(/&nbsp;/g, '');

  if (charLimit == 0) { return validateString; }

  if (validateString.length > charLimit) {
    validateString = validateString.slice(0, charLimit);

    //Remove last word if cut in the middle
    if (validateString.charAt(validateString.length - 1) != ' ') {
      validateString = validateString.slice(0, validateString.lastIndexOf(' '));
    }

    validateString = validateString + '...';
  }

  return validateString;
}

export function formatDate(inputDate: string, noDay: boolean = false) {
    let date = new Date(inputDate);
    date.toLocaleDateString('en-GB');
    let dateString = date.toDateString();

  if (noDay) {
    dateString = dateString.slice(4);
    dateString = dateString.slice(0, 6) + "," + dateString.slice(6);
  }
  else {
    dateString = dateString.slice(0, 3) + "," + dateString.slice(3);
    dateString = dateString.slice(0, 11) + "." + dateString.slice(11);
  }

  return dateString;
}