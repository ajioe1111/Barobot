

export function getArguments(command) {

    const pattern = /("{1}[^"]*"{1}|-{1,2}\w+|\w+)/ig;

    let arguements = command.match(pattern);
    return arguements;
}