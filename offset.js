// This is really stupid
// JS date/time is fucked up as it is
// it's especially more fucked up for when it comes to Nepal time
// Like pound me in the ass with no lube fucked up
// Anywhoo, depending on how i define a Date object, JS will assign a diff timezone
// so far I have seen -330(UTC+05:30), -341(UTC+05:41) and -345(UTC+05:45)
// -345 is the correct one btw. It used to be -330 but got changed to -345 in 1986
// and -341 is close to the natural/solar time of Kathmandu which the capital of Nepal.
// But someone forgot to put the fucking cover sheets in the TPS reports and JS did not
// get the memo about the updated (and the ONLY) timezone for Nepal.
// Therefore I have to account for different formats of time with different offset
// Really fucking dumb!!

const date1 = new Date(0);
const offset1 = date1.getTimezoneOffset();
// offset comes out to be -330
// Use this when using milliseconds or strings to create a date obj

const date2 = new Date(0, 0, 0, 0, 0, 0, 0);
const offset2 = date2.getTimezoneOffset();
// offset comes out to be -341
// IDK what this is to be honest. A glitch in the matrix maybe?

const date3 = new Date();
const offset3 = date3.getTimezoneOffset();
// offset comes out to be -345
// this is the correct value

const minYear = new Date();
console.log(minYear);

export { offset1, offset2, offset3 };
