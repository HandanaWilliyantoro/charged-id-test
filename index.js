// 1. Write a function to print 4 different Triangle Star Pattern
function createStarPattern(rows, direction = 'up') {
    let pattern = '';
    if (direction === 'up') {
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= i; j++) {
                pattern += '* ';
            }
            pattern += '\n';
        }
    } else if (direction === 'down') {
        for (let i = rows; i >= 1; i--) {
            for (let j = 1; j <= i; j++) {
                pattern += '* ';
            }
            pattern += '\n';
        }
    } else if (direction === 'upsideDown') {
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= i; j++) {
                pattern += '* ';
            }
            pattern += '\n';
        }
    } else if (direction === 'pyramid') {
        for (let i = 1; i <= rows; i++) {
            for (let j = rows; j > i; j--) {
                pattern += ' ';
            }
            for (let k = 1; k <= i; k++) {
                pattern += '* ';
            }
            pattern += '\n';
        }
    } else {
        return '\n' + 'Wrong direction value!' + '\n'
    }
    return pattern;
}

// Example usage: (second params value should be up, down, upsideDown and pyramid)
console.log('\nANSWER FOR NUMBER 1:')
console.log(createStarPattern(5, 'up'));
console.log(createStarPattern(5, 'down'));
console.log(createStarPattern(5, 'upsideDown'));
console.log(createStarPattern(5, 'pyramid'));

// 2. Write a function that prints the Fibonacci sequence as an array.
function fibonacciSequence(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}
console.log('\nANSWER FOR NUMBER 2:')
console.log(fibonacciSequence(10))

// 3. Given the following array list, write a function that reverse the array list.
// given array list [4, 2, 8, 5, 1]
// expected results [1, 5, 8, 2, 4]
console.log('\nANSWER FOR NUMBER 3:')
console.log([4, 2, 8, 5, 1].reverse())

// 4. Given the following array list, write a function that remove duplicate elements from the array.
// given array list [4, 2, 2, 8, 5, 1, 2, 4]
// expected results [4, 2, 8, 5, 1]
const arr = [4, 2, 2, 8, 5, 1, 2, 4]
console.log('\nANSWER FOR NUMBER 4:')
console.log(arr.filter((item, index) => arr.indexOf(item) === index));

// 5. Given the following array list, write a function that count and print only duplicate element.
// given array list [4, 2, 2, 8, 5, 1, 2, 4]
// expected results
// 2 = 3
// 4 = 2

function countDuplicateElements(arr) {
    const counts = {};
    arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    for (const [key, value] of Object.entries(counts)) {
        if (value > 1) {
            console.log(`${key} = ${value}`);
        }
    }
}

// Example usage:
const arrayList = [4, 2, 2, 8, 5, 1, 2, 4];
console.log('\nANSWER FOR NUMBER 5:')
countDuplicateElements(arrayList);

// 6. find the largest and smallest number in an array
// given array list [4, 2, 8, 5, 1]
// expected results:
// smallest number = 1
// largest number = 8

function findMinMax(arr) {
    if (arr.length === 0) {
        return "The array is empty.";
    }

    const smallest = Math.min(...arr);
    const largest = Math.max(...arr);

    return {
        smallest: smallest,
        largest: largest
    };
}

// Example usage:
const arrayofNumbers = [4, 2, 8, 5, 1];
const result = findMinMax(arrayofNumbers);
console.log('\nANSWER FOR NUMBER 6:')
console.log("Smallest number:", result.smallest);
console.log("Largest number:", result.largest);

// 7. Assuming all relations are present, are there any issues with this statement? What will this statement return? (Check question for detailed code)
console.log('\nANSWER FOR NUMBER 7:')
console.log(
    `\nIt will return a collection of Article records where:
1. There are associated comments.
2. The created_at of the articles falls within the range specified by date1 and date2.
3. The publish_date of the articles is greater than or equal to the value of params[:date].
4. The genre of the articles is 'Pop'.
5. There are associated comments with a created_at greater than or equal to the value of params[:date].
6. It selects only the title attribute of the articles`
)

// 8. Would any changes be necessary/preferable for the following controller code? (Check question for detailed code)

console.log('\nANSWER FOR NUMBER 8:')
console.log(`
    \nclass ArticlesController < ApplicationController
    def update
      article = Article.find(params[:id])
      article.update(article_params)
  
      update_article_details(article)
  
      process_pending_review(article)
    end
  
    private
  
    def article_params
      params.require(:article).permit(:title, :content, :genre)
    end
  
    def update_article_details(article)
      case article.genre
      when 'Pop'
        article.publish_date = Date.today + 1.month
        article.status = 'pending_review'
      when 'Animals'
        article.publish_date = Date.today + 2.weeks
        article.status = 'pending_approval'
      end
    end
  
    def process_pending_review(article)
      if article.status == 'pending_review'
        writer = article.writer.includes(:articles).first
        if writer.articles.count > 10
          writer.status = 'pending_upgrade_review'
          writer.save!
          SendWriterUpgradeMail.perform_now(writer)
        end
      end
    end
  end
`)
console.log(`
1. We use the update method instead of update_attributes, as it's more conventional in Rails.
2. We've incorporated strong parameters by defining the article_params method to permit only the necessary parameters.
3. The conditional logic for updating publish_date and status based on the genre is refactored using a case statement, improving readability.
4. We've optimized the query to fetch the associated writer by using eager loading with includes(:articles) to avoid N+1 query issues.
`)