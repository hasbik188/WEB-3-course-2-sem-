        let str = function(line) {
            line += " ";
            let shortWord = line; 
            let currentWord = "";
            let newLine = "";
            
            for (let i = 0; i < line.length; i++) {
                if (line[i] != " ") {
                    currentWord += line[i];
                    
                } else {
                    if (currentWord.length < shortWord.length && currentWord.length != 0) {
                        shortWord = currentWord;
                        newLine = shortWord;
                    } else if (currentWord.length == shortWord.length) {
                        newLine += " " + currentWord; 
                    }
                    currentWord = ""; 
                    
                }

            }
            return newLine;
        }
        
        let line = prompt("Введите строку: ", "Hello World");

        line = line.trim();
        alert(str(line));