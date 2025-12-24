// All Christmas games data extracted from the PDF bundle

export const GAME_TYPES = {
  TRIVIA: 'trivia',
  MULTIPLE_CHOICE: 'multiple_choice',
  EMOJI: 'emoji',
  WORD_SCRAMBLE: 'word_scramble',
  FILL_BLANK: 'fill_blank',
  MATCHING: 'matching',
  TRUE_FALSE: 'true_false',
  TWO_CHOICE: 'two_choice',
  CODECRACKER: 'codecracker',
};

export const games = {
  // ============================================
  // CHRISTMAS MOVIE EMOJI GAME (15 questions)
  // ============================================
  'movie-emoji': {
    id: 'movie-emoji',
    title: 'Christmas Movie Emoji Game',
    description: 'Guess the Christmas movie based on the emoji hints!',
    type: GAME_TYPES.EMOJI,
    icon: '🎬',
    questions: [
      { id: 1, prompt: '🏠🚫😱😠', answer: 'Home Alone', alternates: ['home alone 1'] },
      { id: 2, prompt: '😨👻🎄', answer: 'The Nightmare Before Christmas', alternates: ['nightmare before christmas'] },
      { id: 3, prompt: '🧝🥿🥿', answer: 'Elf', alternates: [] },
      { id: 4, prompt: '❄️⛄', answer: 'Frosty the Snowman', alternates: ['frosty'] },
      { id: 5, prompt: '🦌🔴👃🦌', answer: 'Rudolph the Red-Nosed Reindeer', alternates: ['rudolph'] },
      { id: 6, prompt: '🌨️🎄', answer: 'White Christmas', alternates: [] },
      { id: 7, prompt: '🐻‍❄️🚂🎫', answer: 'The Polar Express', alternates: ['polar express'] },
      { id: 8, prompt: '🐸🐷🎄🎵', answer: 'The Muppet Christmas Carol', alternates: ['muppet christmas carol'] },
      { id: 9, prompt: '🎅👎', answer: 'Bad Santa', alternates: [] },
      { id: 10, prompt: '🎄🚗🏠', answer: 'Christmas Vacation', alternates: ['national lampoons christmas vacation', 'national lampoon christmas vacation'] },
      { id: 11, prompt: '4️⃣🎄🎄🎄🎄', answer: 'Four Christmases', alternates: ['4 christmases'] },
      { id: 12, prompt: '🔔➡️', answer: 'Jingle All the Way', alternates: [] },
      { id: 13, prompt: '👨‍👩‍👧‍👦💎', answer: 'The Family Stone', alternates: ['family stone'] },
      { id: 14, prompt: '✨🤚4️⃣🛣️', answer: 'Miracle on 34th Street', alternates: [] },
      { id: 15, prompt: '🎄📖', answer: 'A Christmas Story', alternates: ['christmas story'] },
    ]
  },

  // ============================================
  // CHRISTMAS SONG EMOJI GAME (15 questions)
  // ============================================
  'song-emoji': {
    id: 'song-emoji',
    title: 'Christmas Song Emoji Game',
    description: 'Guess the Christmas song based on the emoji hints!',
    type: GAME_TYPES.EMOJI,
    icon: '🎵',
    questions: [
      { id: 1, prompt: '🙏❄️❄️❄️🙏❄️❄️❄️🙏❄️❄️❄️', answer: 'Let It Snow! Let It Snow! Let It Snow!', alternates: ['let it snow'] },
      { id: 2, prompt: '🤫🌙', answer: 'Silent Night', alternates: [] },
      { id: 3, prompt: '🎸🔃🎄', answer: "Rockin' Around the Christmas Tree", alternates: ['rockin around the christmas tree'] },
      { id: 4, prompt: '🎵🔔🪨', answer: 'Jingle Bell Rock', alternates: [] },
      { id: 5, prompt: '1️⃣📅🎁🎄', answer: 'The Twelve Days of Christmas', alternates: ['12 days of christmas', 'twelve days of christmas'] },
      { id: 6, prompt: '🎅👀📝🚗🏙️', answer: 'Santa Claus Is Coming to Town', alternates: ['santa claus is coming to town'] },
      { id: 7, prompt: '🥈🔔🔔', answer: 'Silver Bells', alternates: [] },
      { id: 8, prompt: '👁️💤🌨️🎄', answer: "I'm Dreaming of a White Christmas", alternates: ['white christmas', 'im dreaming of a white christmas'] },
      { id: 9, prompt: '🦌🔴', answer: 'Rudolph the Red-Nosed Reindeer', alternates: ['rudolph'] },
      { id: 10, prompt: '🐣🥁👦', answer: 'Little Drummer Boy', alternates: [] },
      { id: 11, prompt: '😄🎉➡️🌍', answer: 'Joy to the World', alternates: [] },
      { id: 12, prompt: '👀👩💋🎅', answer: 'I Saw Mommy Kissing Santa Claus', alternates: [] },
      { id: 13, prompt: '🌰🔥🚪', answer: 'Chestnuts Roasting on an Open Fire', alternates: ['the christmas song', 'chestnuts roasting'] },
      { id: 14, prompt: '🎅📢', answer: 'Santa Tell Me', alternates: [] },
      { id: 15, prompt: '🐝🏠4️⃣🎄', answer: "I'll Be Home for Christmas", alternates: ['ill be home for christmas'] },
    ]
  },

  // ============================================
  // CHRISTMAS TRIVIA (18 questions)
  // ============================================
  'christmas-trivia': {
    id: 'christmas-trivia',
    title: 'Christmas Trivia',
    description: 'Test your knowledge of Christmas traditions and facts!',
    type: GAME_TYPES.TRIVIA,
    icon: '🎄',
    questions: [
      { id: 1, question: 'Which country is credited with starting the tradition of the Christmas tree?', answer: 'Germany', alternates: [] },
      { id: 2, question: 'What popular holiday plant has red and green leaves and is native to Mexico?', answer: 'Poinsettia', alternates: ['poinsettias'] },
      { id: 3, question: 'Which U.S. state was the first to officially recognize Christmas as a holiday?', answer: 'Alabama', alternates: [] },
      { id: 4, question: 'What was the first Christmas song ever broadcast from space?', answer: 'Jingle Bells', alternates: [] },
      { id: 5, question: 'Which popular Christmas beverage is also known as "milk punch"?', answer: 'Eggnog', alternates: ['egg nog'] },
      { id: 6, question: 'How do you say "Merry Christmas" in Spanish?', answer: 'Feliz Navidad', alternates: [] },
      { id: 7, question: 'Which country is credited with starting the tradition of sending Christmas cards?', answer: 'England', alternates: ['uk', 'united kingdom', 'britain'] },
      { id: 8, question: 'Who is the author of "A Christmas Carol"?', answer: 'Charles Dickens', alternates: ['dickens'] },
      { id: 9, question: 'What item of clothing brings Frosty the Snowman to life?', answer: 'An old silk hat', alternates: ['silk hat', 'hat', 'magic hat', 'a magic hat', 'top hat'] },
      { id: 10, question: 'What was the first company to use Santa Claus in advertising?', answer: 'Coca-Cola', alternates: ['coca cola', 'coke'] },
      { id: 11, question: "In the song 'The Twelve Days of Christmas,' what gift is given on the fifth day?", answer: 'Five golden rings', alternates: ['golden rings', '5 golden rings'] },
      { id: 12, question: 'Which U.S. state produces the most Christmas trees?', answer: 'Oregon', alternates: [] },
      { id: 13, question: "Name Santa's nine reindeer.", answer: 'Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph', alternates: [] },
      { id: 14, question: "What color is Santa's belt?", answer: 'Black', alternates: [] },
      { id: 15, question: 'Which famous fairy tale inspired the creation of the first gingerbread houses?', answer: 'Hansel and Gretel', alternates: [] },
      { id: 16, question: 'What traditional Christmas decoration is actually a parasitic plant?', answer: 'Mistletoe', alternates: [] },
      { id: 17, question: 'In which ocean is Christmas Island located?', answer: 'Indian Ocean', alternates: [] },
      { id: 18, question: 'What are the two most common tree toppers on a Christmas tree?', answer: 'Star and Angel', alternates: ['angel and star', 'star or angel', 'angel or star'] },
    ]
  },

  // ============================================
  // CHRISTMAS MOVIE TRIVIA (18 questions)
  // ============================================
  'movie-trivia': {
    id: 'movie-trivia',
    title: 'Christmas Movie Trivia',
    description: 'How well do you know your Christmas movies?',
    type: GAME_TYPES.TRIVIA,
    icon: '🎥',
    questions: [
      { id: 1, question: "In Home Alone, where was Kevin's family flying to for Christmas vacation?", answer: 'Paris', alternates: ['france'] },
      { id: 2, question: 'What are the names of the two burglars in Home Alone?', answer: 'Harry and Marv', alternates: ['marv and harry'] },
      { id: 3, question: 'In Elf, what is the first rule in the Code of Elves?', answer: 'Treat every day like Christmas', alternates: [] },
      { id: 4, question: "What toy does Buddy the Elf have to test in Santa's workshop?", answer: 'Jack-in-the-Box', alternates: ['jack in the box'] },
      { id: 5, question: 'Who voices the Conductor in The Polar Express?', answer: 'Tom Hanks', alternates: [] },
      { id: 6, question: "In It's a Wonderful Life, what happens every time a bell rings?", answer: 'An angel gets its wings', alternates: ['angel gets wings', 'an angel gets wings'] },
      { id: 7, question: 'What is the highest-grossing Christmas movie of all time?', answer: 'The Grinch (2018, animated)', alternates: ['the grinch', 'grinch', 'grinch 2018'] },
      { id: 8, question: "What is the little girl's name who helps Frosty in Frosty the Snowman?", answer: 'Karen', alternates: [] },
      { id: 9, question: 'In White Christmas, who played the role of Bob Wallace?', answer: 'Bing Crosby', alternates: [] },
      { id: 10, question: 'In The Polar Express, what drink is served to the children on the train?', answer: 'Hot chocolate', alternates: ['hot cocoa', 'cocoa'] },
      { id: 11, question: 'What state does A Christmas Story take place in?', answer: 'Indiana', alternates: [] },
      { id: 12, question: 'In Miracle on 34th Street, which department store is the setting?', answer: "Macy's", alternates: ['macys', 'macy'] },
      { id: 13, question: "The Grinch's heart is how many sizes too small at the beginning of the story?", answer: 'Two sizes too small', alternates: ['two', '2', '2 sizes'] },
      { id: 14, question: 'In Elf, what does Buddy pour on his spaghetti?', answer: 'Maple syrup', alternates: ['syrup'] },
      { id: 15, question: 'In Jingle All the Way, what toy is Howard Langston trying to buy for his son?', answer: 'Turbo Man', alternates: ['turboman'] },
      { id: 16, question: 'What U.S. President has a short cameo in Home Alone 2?', answer: 'Donald Trump', alternates: ['trump'] },
      { id: 17, question: 'In The Santa Clause, who plays Scott Calvin, the man who becomes Santa?', answer: 'Tim Allen', alternates: [] },
      { id: 18, question: 'In How the Grinch Stole Christmas (2000), who played the Grinch?', answer: 'Jim Carrey', alternates: [] },
    ]
  },

  // ============================================
  // CHRISTMAS AROUND THE WORLD TRIVIA (10 questions - Multiple Choice)
  // ============================================
  'world-trivia': {
    id: 'world-trivia',
    title: 'Christmas Around the World',
    description: 'Test your knowledge of Christmas traditions worldwide!',
    type: GAME_TYPES.MULTIPLE_CHOICE,
    icon: '🌍',
    questions: [
      { id: 1, question: 'The term "Xmas" comes from which language?', options: ['Latin', 'Greek', 'Hebrew', 'French'], answer: 'Greek' },
      { id: 2, question: 'In which country is it traditional to eat KFC for Christmas dinner?', options: ['Canada', 'Vietnam', 'Japan', 'China'], answer: 'Japan' },
      { id: 3, question: 'Which of these is NOT a name for Santa Claus around the world?', options: ['Père Noël', 'Babbo Natale', 'Poppo Rosa', 'Sinterklaas'], answer: 'Poppo Rosa' },
      { id: 4, question: 'Which country celebrates Christmas with a giant lantern festival in the city of San Fernando?', options: ['Philippines', 'Mexico', 'Brazil', 'Argentina'], answer: 'Philippines' },
      { id: 5, question: "What's the most popular Christmas dessert in New Zealand?", options: ['Pavlova', 'Fruitcake', 'Gingerbread', 'Panettone'], answer: 'Pavlova' },
      { id: 6, question: 'In which European country is "Julebord" a popular Christmas tradition involving large feasts?', options: ['Finland', 'Sweden', 'Denmark', 'Norway'], answer: 'Norway' },
      { id: 7, question: 'In which country do children place their shoes out for Santa to fill with gifts?', options: ['Netherlands', 'France', 'Italy', 'Germany'], answer: 'Netherlands' },
      { id: 8, question: 'In which country is "La Befana," a kindly witch, said to deliver gifts to children on January 6th?', options: ['Portugal', 'Spain', 'Greece', 'Italy'], answer: 'Italy' },
      { id: 9, question: 'Which country is known for its Christmas markets, such as the famous one in Nuremberg?', options: ['Austria', 'Germany', 'Switzerland', 'Czech Republic'], answer: 'Germany' },
      { id: 10, question: 'Which country started the tradition of putting up a Christmas tree?', options: ['Germany', 'Canada', 'United States', 'England'], answer: 'Germany' },
    ]
  },

  // ============================================
  // FACT OR FICTION (15 questions)
  // ============================================
  'fact-or-fiction': {
    id: 'fact-or-fiction',
    title: 'Fact or Fiction',
    description: 'Can you tell Christmas facts from fiction?',
    type: GAME_TYPES.TRUE_FALSE,
    icon: '🤔',
    questions: [
      { id: 1, statement: 'Santa Claus was originally depicted wearing green.', answer: false },
      { id: 2, statement: 'The largest Christmas gift given was the Statue of Liberty.', answer: true },
      { id: 3, statement: "In Japan, it's a tradition to eat KFC for Christmas dinner.", answer: true },
      { id: 4, statement: 'The Nutcracker was first performed in 1892 in Moscow.', answer: true },
      { id: 5, statement: 'Eggnog was first made in the United States.', answer: false },
      { id: 6, statement: 'All reindeer are male.', answer: false },
      { id: 7, statement: 'Mistletoe was a symbol of peace and used in ancient mythology.', answer: true },
      { id: 8, statement: 'Poinsettias are native to Australia.', answer: false },
      { id: 9, statement: 'Rudolph was created by a department store as a marketing gimmick.', answer: true },
      { id: 10, statement: 'The abbreviation "Xmas" is a modern, commercial invention.', answer: false },
      { id: 11, statement: 'The first artificial Christmas trees were made from feathers.', answer: true },
      { id: 12, statement: 'Christmas celebrates the birth of Jesus Christ.', answer: true },
      { id: 13, statement: "The world's largest stocking was over 150 feet long.", answer: true },
      { id: 14, statement: 'The tradition of the Christmas tree originated in Germany.', answer: true },
      { id: 15, statement: '"Jingle Bells" was originally written for Thanksgiving.', answer: true },
    ]
  },

  // ============================================
  // FINISH THE LYRICS (20 questions)
  // ============================================
  'finish-lyrics': {
    id: 'finish-lyrics',
    title: 'Finish the Lyrics',
    description: 'Complete the Christmas song lyrics!',
    type: GAME_TYPES.FILL_BLANK,
    icon: '🎤',
    questions: [
      { id: 1, prompt: "I'm dreaming of a white Christmas with...", answer: 'every Christmas card I write', alternates: [] },
      { id: 2, prompt: 'Jingle bell, jingle bell, jingle bell rock. Jingle bells...', answer: 'swing and Jingle bells ring', alternates: ['swing and jingle bells ring'] },
      { id: 3, prompt: 'Oh Christmas Tree, Oh Christmas Tree, your...', answer: 'leaves are so unchanging', alternates: ['boughs are so unchanging'] },
      { id: 4, prompt: "I don't want a lot for Christmas. There is...", answer: 'just one thing I need', alternates: [] },
      { id: 5, prompt: 'Chestnuts roasting on an open fire,...', answer: 'Jack Frost nipping at your nose', alternates: [] },
      { id: 6, prompt: 'I wanna wish you a "Merry Christmas" from the...', answer: 'bottom of my heart', alternates: [] },
      { id: 7, prompt: 'City sidewalks, busy sidewalks, dressed in...', answer: 'holiday style', alternates: [] },
      { id: 8, prompt: 'Last Christmas, I gave you my heart, but the...', answer: 'very next day, you gave it away', alternates: ['very next day you gave it away'] },
      { id: 9, prompt: 'They never let poor Rudolph join in...', answer: 'any reindeer games', alternates: [] },
      { id: 10, prompt: "You better watch out, you better not cry, you better not pout, I'm telling you why...", answer: 'Santa Claus is coming to town', alternates: ['santa claus is comin to town'] },
      { id: 11, prompt: 'Rudolph the red-nosed reindeer,...', answer: "you'll go down in history", alternates: ['youll go down in history'] },
      { id: 12, prompt: 'Have yourself a Merry Little Christmas, let...', answer: 'your heart be light', alternates: [] },
      { id: 13, prompt: 'But the prettiest sight to see is the holly that...', answer: 'will be on your front door', alternates: ['will be on your own front door'] },
      { id: 14, prompt: 'Oh, what fun it is to ride in a one...', answer: 'horse open sleigh', alternates: [] },
      { id: 15, prompt: 'Up on the housetop reindeer pause,...', answer: 'out jumps good old Santa Claus', alternates: [] },
      { id: 16, prompt: 'And when you walk down the street,...', answer: 'say "Hello" to friends you know', alternates: ['say hello to friends you know'] },
      { id: 17, prompt: 'In the meadow, we can build a snowman, and...', answer: 'pretend that he is Parson Brown', alternates: [] },
      { id: 18, prompt: "Bells are ringin', children singin'. All is...", answer: 'merry and bright', alternates: [] },
      { id: 19, prompt: 'Children laughing, people passing. Meeting...', answer: 'smile after smile', alternates: [] },
      { id: 20, prompt: 'Oh the weather outside is frightful, but the...', answer: 'fire is so delightful', alternates: [] },
    ]
  },

  // ============================================
  // WORD SCRAMBLE 1 (15 words)
  // ============================================
  'word-scramble-1': {
    id: 'word-scramble-1',
    title: 'Word Scramble 1',
    description: 'Unscramble these Christmas words!',
    type: GAME_TYPES.WORD_SCRAMBLE,
    icon: '🔤',
    questions: [
      { id: 1, scrambled: 'SMARHCTIS', answer: 'CHRISTMAS' },
      { id: 2, scrambled: 'NOMARTENS', answer: 'ORNAMENTS' },
      { id: 3, scrambled: 'BRAGDERGINE', answer: 'GINGERBREAD' },
      { id: 4, scrambled: 'WONMSAN', answer: 'SNOWMAN' },
      { id: 5, scrambled: 'EGLSHI', answer: 'SLEIGH' },
      { id: 6, scrambled: 'TRYOFS', answer: 'FROSTY' },
      { id: 7, scrambled: 'NERDEIRE', answer: 'REINDEER' },
      { id: 8, scrambled: 'RMYER', answer: 'MERRY' },
      { id: 9, scrambled: 'TIRWEN', answer: 'WINTER' },
      { id: 10, scrambled: 'CEPAE', answer: 'PEACE' },
      { id: 11, scrambled: 'RTOHN POEL', answer: 'NORTH POLE' },
      { id: 12, scrambled: 'TNERESPS', answer: 'PRESENTS' },
      { id: 13, scrambled: 'BEMDERCE', answer: 'DECEMBER' },
      { id: 14, scrambled: 'DCNYA ACNE', answer: 'CANDY CANE' },
      { id: 15, scrambled: 'GOGNEG', answer: 'EGGNOG' },
    ]
  },

  // ============================================
  // WORD SCRAMBLE 2 (15 words)
  // ============================================
  'word-scramble-2': {
    id: 'word-scramble-2',
    title: 'Word Scramble 2',
    description: 'Unscramble more Christmas words!',
    type: GAME_TYPES.WORD_SCRAMBLE,
    icon: '🔤',
    questions: [
      { id: 1, scrambled: 'JGNILE SLBEL', answer: 'JINGLE BELLS' },
      { id: 2, scrambled: 'TOSELTMIE', answer: 'MISTLETOE' },
      { id: 3, scrambled: 'SESUJ', answer: 'JESUS' },
      { id: 4, scrambled: 'RCUTNCAEKR', answer: 'NUTCRACKER' },
      { id: 5, scrambled: 'GELNA', answer: 'ANGEL' },
      { id: 6, scrambled: 'TAASN AULCS', answer: 'SANTA CLAUS' },
      { id: 7, scrambled: 'HMRISCTSA EERT', answer: 'CHRISTMAS TREE' },
      { id: 8, scrambled: 'LYLJO', answer: 'JOLLY' },
      { id: 9, scrambled: 'VTIYNITA', answer: 'NATIVITY' },
      { id: 10, scrambled: 'TAERHW', answer: 'WREATH' },
      { id: 11, scrambled: 'OOKIEC', answer: 'COOKIE' },
      { id: 12, scrambled: 'SLTEIN', answer: 'TINSEL' },
      { id: 13, scrambled: 'TKSOCIGN', answer: 'STOCKING' },
      { id: 14, scrambled: 'OTH HTOLOACCE', answer: 'HOT CHOCOLATE' },
      { id: 15, scrambled: 'DULHOPR', answer: 'RUDOLPH' },
    ]
  },

  // ============================================
  // WORD SCRAMBLE 3 (15 words)
  // ============================================
  'word-scramble-3': {
    id: 'word-scramble-3',
    title: 'Word Scramble 3',
    description: 'Even more Christmas words to unscramble!',
    type: GAME_TYPES.WORD_SCRAMBLE,
    icon: '🔤',
    questions: [
      { id: 1, scrambled: 'YOLHL', answer: 'HOLLY' },
      { id: 2, scrambled: 'ROCALING', answer: 'CAROLING' },
      { id: 3, scrambled: 'WONELFASK', answer: 'SNOWFLAKE' },
      { id: 4, scrambled: 'DARLANG', answer: 'GARLAND' },
      { id: 5, scrambled: 'RUGAS SICKOEO', answer: 'SUGAR COOKIES' },
      { id: 6, scrambled: 'FLE', answer: 'ELF' },
      { id: 7, scrambled: 'HIMEYNC', answer: 'CHIMNEY' },
      { id: 8, scrambled: 'PALFIERCE', answer: 'FIREPLACE' },
      { id: 9, scrambled: 'TIFG PAWR', answer: 'GIFT WRAP' },
      { id: 10, scrambled: 'TOPESITIAN', answer: 'POINSETTIA' },
      { id: 11, scrambled: 'DINGLEDS', answer: 'SLEDDING' },
      { id: 12, scrambled: 'SIGHTL', answer: 'LIGHTS' },
      { id: 13, scrambled: 'LIBZDARZ', answer: 'BLIZZARD' },
      { id: 14, scrambled: 'SANDLEC', answer: 'CANDLES' },
      { id: 15, scrambled: 'CIE TAKINGS', answer: 'ICE SKATING' },
    ]
  },

  // ============================================
  // CODECRACKER EASY (10 phrases)
  // ============================================
  'codecracker-easy': {
    id: 'codecracker-easy',
    title: 'Codecracker (Easy)',
    description: 'Crack the code! Numbers = letters (A=1, B=2...)',
    type: GAME_TYPES.CODECRACKER,
    icon: '🔐',
    questions: [
      { id: 1, code: '13-5-18-18-25 3-8-18-9-19-20-13-1-19', answer: 'MERRY CHRISTMAS' },
      { id: 2, code: '4-5-3-11 20-8-5 8-1-12-12-19', answer: 'DECK THE HALLS' },
      { id: 3, code: '6-1 12-1 12-1 12-1 12-1', answer: 'FA LA LA LA LA' },
      { id: 4, code: '8-15-12-12-25 10-15-12-12-25', answer: 'HOLLY JOLLY' },
      { id: 5, code: '6-18-15-19-20-25 6-21-14', answer: 'FROSTY FUN' },
      { id: 6, code: '12-5-20 9-20 19-14-15-23', answer: 'LET IT SNOW' },
      { id: 7, code: '3-8-18-9-19-20-13-1-19 3-8-5-5-18', answer: 'CHRISTMAS CHEER' },
      { id: 8, code: '16-5-1-3-5 15-14 5-1-18-20-8', answer: 'PEACE ON EARTH' },
      { id: 9, code: '8-15-12-25 14-9-7-8-20', answer: 'HOLY NIGHT' },
      { id: 10, code: '8-15 8-15 8-15', answer: 'HO HO HO' },
    ]
  },

  // ============================================
  // CODECRACKER HARD (10 phrases)
  // ============================================
  'codecracker-hard': {
    id: 'codecracker-hard',
    title: 'Codecracker (Hard)',
    description: 'Crack the mixed codes! Some numbers, some letters.',
    type: GAME_TYPES.CODECRACKER,
    icon: '🔓',
    questions: [
      { id: 1, code: '10-15-25 20-15 20-8-5 23-15-18-12-4', answer: 'JOY TO THE WORLD' },
      { id: 2, code: 'L-D-Q-Q-X A-M-C A-Q-H-F-G-S', answer: 'MERRY AND BRIGHT', hint: 'Caesar cipher shift' },
      { id: 3, code: 'Q-F-B-D-F P-O F-B-S-U-I', answer: 'PEACE ON EARTH', hint: 'Caesar cipher shift' },
      { id: 4, code: 'X-J-O-U-F-S 23-15-14-4-5-18-12-1-14-4', answer: 'WINTER WONDERLAND' },
      { id: 5, code: '19-1-14-20-1 3-12-1-21-19', answer: 'SANTA CLAUS' },
      { id: 6, code: 'H-J-O-H-F-S-C-S-F-B-E G-N-T-R-D', answer: 'GINGERBREAD HOUSE' },
      { id: 7, code: 'I-H-M-F-K-D 1-12-12 20-8-5 X-B-Z', answer: 'JINGLE ALL THE WAY' },
      { id: 8, code: 'G-N-K-K-X I-N-K-K-X', answer: 'HOLLY JOLLY' },
      { id: 9, code: '12-5-20 21-19 B-E-P-S-F 8-9-13', answer: 'LET US ADORE HIM' },
      { id: 10, code: '13-5-18-18-25 3-8-18-9-19-20-13-1-19', answer: 'MERRY CHRISTMAS' },
    ]
  },

  // ============================================
  // FESTIVE FOOD MATCH (10 items)
  // ============================================
  'food-match': {
    id: 'food-match',
    title: 'Festive Food Match',
    description: 'Match each Christmas food with its country!',
    type: GAME_TYPES.MATCHING,
    icon: '🍽️',
    pairs: [
      { item: 'Roast Turkey', match: 'United States' },
      { item: 'Panettone', match: 'Italy' },
      { item: 'Turrón', match: 'Spain' },
      { item: 'Yule Log Cake', match: 'France' },
      { item: 'Stollen', match: 'Germany' },
      { item: 'Bolo Rei', match: 'Portugal' },
      { item: 'Christmas Pudding', match: 'United Kingdom' },
      { item: 'Pavlova', match: 'Australia' },
      { item: 'Tamales', match: 'Mexico' },
      { item: 'Lechon', match: 'Philippines' },
    ]
  },

  // ============================================
  // RECIPE CHALLENGE (15 items)
  // ============================================
  'recipe-challenge': {
    id: 'recipe-challenge',
    title: 'Recipe Challenge',
    description: 'Guess the Christmas dish from its ingredients!',
    type: GAME_TYPES.FILL_BLANK,
    icon: '👨‍🍳',
    questions: [
      { id: 1, prompt: 'Ham, Honey, Brown Sugar, Cloves, Mustard', answer: 'Honey-Glazed Ham', alternates: ['glazed ham', 'honey ham'] },
      { id: 2, prompt: 'Flour, Sugar, Butter, Eggs, Vanilla', answer: 'Sugar Cookies', alternates: ['cookies'] },
      { id: 3, prompt: 'Brussels Sprouts, Olive Oil, Salt, Pepper, Bacon', answer: 'Roast Brussels Sprouts', alternates: ['roasted brussels sprouts', 'brussels sprouts'] },
      { id: 4, prompt: 'Milk, Cream, Sugar, Eggs, Nutmeg, Rum (optional)', answer: 'Eggnog', alternates: [] },
      { id: 5, prompt: 'Pumpkin, Eggs, Sugar, Cinnamon, Nutmeg, Pie Crust', answer: 'Pumpkin Pie', alternates: [] },
      { id: 6, prompt: 'Flour, Ginger, Cinnamon, Cloves, Molasses, Butter', answer: 'Gingerbread Cookies', alternates: ['gingerbread', 'gingerbread men'] },
      { id: 7, prompt: 'Turkey, Butter, Herbs, Garlic, Onion', answer: 'Roast Turkey', alternates: ['turkey', 'roasted turkey'] },
      { id: 8, prompt: 'Green Beans, Cream of Mushroom Soup, Fried Onions', answer: 'Green Bean Casserole', alternates: [] },
      { id: 9, prompt: 'Mincemeat (Dried Fruits, Spices, Suet), Pastry', answer: 'Mince Pies', alternates: ['mince pie', 'mincemeat pie'] },
      { id: 10, prompt: 'Apples, Sugar, Cinnamon, Nutmeg, Pie Crust', answer: 'Apple Pie', alternates: [] },
      { id: 11, prompt: 'Sponge Cake, Chocolate, Buttercream', answer: 'Yule Log', alternates: ['buche de noel', 'yule log cake'] },
      { id: 12, prompt: 'Potatoes, Butter, Cream, Salt, Pepper', answer: 'Mashed Potatoes', alternates: [] },
      { id: 13, prompt: 'Cranberries, Sugar, Orange Juice', answer: 'Cranberry Sauce', alternates: [] },
      { id: 14, prompt: 'Bread, Onion, Celery, Herbs, Butter', answer: 'Stuffing', alternates: ['dressing'] },
      { id: 15, prompt: 'Pan Drippings, Flour, Broth, Salt, Pepper', answer: 'Gravy', alternates: [] },
    ]
  },

  // ============================================
  // CANDY CHALLENGE (15 items)
  // ============================================
  'candy-challenge': {
    id: 'candy-challenge',
    title: 'Candy Challenge',
    description: 'Name the candy from the description!',
    type: GAME_TYPES.FILL_BLANK,
    icon: '🍬',
    questions: [
      { id: 1, prompt: 'Twisted Peppermint Stick', answer: 'Candy Cane', alternates: ['candy canes'] },
      { id: 2, prompt: 'Foiled Chocolate Teardrops', answer: "Hershey's Kisses", alternates: ['hershey kisses', 'kisses'] },
      { id: 3, prompt: 'Tiny Candy-Coated Crunch', answer: "M&M's Holiday Mix", alternates: ['m&ms', 'mms'] },
      { id: 4, prompt: 'Chocolate Slab with Shards', answer: 'Peppermint Bark', alternates: [] },
      { id: 5, prompt: 'Dense Chocolate Squares', answer: 'Fudge', alternates: [] },
      { id: 6, prompt: 'Buttery Snap-and-Chew', answer: 'Toffee', alternates: [] },
      { id: 7, prompt: 'Rich Melting Centers', answer: 'Chocolate Truffles', alternates: ['truffles'] },
      { id: 8, prompt: 'Cherry Surprise Inside', answer: 'Chocolate-Covered Cherries', alternates: ['chocolate covered cherries'] },
      { id: 9, prompt: 'Salty Twist Meets Chocolate', answer: 'Chocolate-Covered Pretzels', alternates: ['chocolate covered pretzels', 'chocolate pretzels'] },
      { id: 10, prompt: 'Sugary Jelly Lumps', answer: 'Gumdrops', alternates: ['gum drops'] },
      { id: 11, prompt: 'Thin Mint Discs', answer: 'Peppermint Patties', alternates: ['peppermint patty', 'york peppermint patties'] },
      { id: 12, prompt: 'Fluffy Sticky Squares', answer: 'Marshmallow Treats', alternates: ['rice krispie treats', 'marshmallows'] },
      { id: 13, prompt: 'Chewy Golden Nuggets', answer: 'Caramel Candies', alternates: ['caramels', 'caramel'] },
      { id: 14, prompt: 'Colorful Curly Strips', answer: 'Ribbon Candy', alternates: [] },
      { id: 15, prompt: 'Silky Chocolate Balls', answer: 'Lindt Lindor Truffles', alternates: ['lindor truffles', 'lindt truffles', 'lindor'] },
    ]
  },

  // ============================================
  // RED OR GREEN (16 questions)
  // ============================================
  'red-or-green': {
    id: 'red-or-green',
    title: 'Red or Green Challenge',
    description: 'Quick-fire: Is the answer Red or Green?',
    type: GAME_TYPES.TWO_CHOICE,
    icon: '🔴🟢',
    questions: [
      { id: 1, question: 'The color of the gemstone associated with the month of January', answer: 'Red', options: ['Red', 'Green'] },
      { id: 2, question: 'The color of the original "Monopoly" game board background', answer: 'Green', options: ['Red', 'Green'] },
      { id: 3, question: 'The color of the traditional Christmas flower Poinsettia', answer: 'Red', options: ['Red', 'Green'] },
      { id: 4, question: 'The color of the outer cover of the first edition of "The Great Gatsby"', answer: 'Green', options: ['Red', 'Green'] },
      { id: 5, question: "The color of the main Chicago Bulls' uniforms", answer: 'Red', options: ['Red', 'Green'] },
      { id: 6, question: 'The color of the mountain-dwelling character who tries to steal Christmas', answer: 'Green', options: ['Red', 'Green'] },
      { id: 7, question: "The color traditionally associated with Valentine's Day", answer: 'Red', options: ['Red', 'Green'] },
      { id: 8, question: 'The color of road signs showing airport directions in the U.S.', answer: 'Green', options: ['Red', 'Green'] },
      { id: 9, question: "The color traditionally linked to St. Patrick's Day", answer: 'Green', options: ['Red', 'Green'] },
      { id: 10, question: 'The color of the outer skin of a fully ripe Habanero pepper', answer: 'Red', options: ['Red', 'Green'] },
      { id: 11, question: "The color of Manchester United's home jersey", answer: 'Red', options: ['Red', 'Green'] },
      { id: 12, question: 'The color of the traditional Indian drink Palak Lassi', answer: 'Green', options: ['Red', 'Green'] },
      { id: 13, question: 'The stitching color of a traditional Major League Baseball', answer: 'Red', options: ['Red', 'Green'] },
      { id: 14, question: 'The main color of the flag of Turkey', answer: 'Red', options: ['Red', 'Green'] },
      { id: 15, question: 'The color of the jacket worn by the golf champion at the Masters', answer: 'Green', options: ['Red', 'Green'] },
      { id: 16, question: 'The color of the fruits found on a holly plant', answer: 'Red', options: ['Red', 'Green'] },
    ]
  },

  // ============================================
  // RIDDLE ME THIS (15 riddles)
  // ============================================
  'riddles': {
    id: 'riddles',
    title: 'Riddle Me This',
    description: 'Match each Christmas riddle to its answer!',
    type: GAME_TYPES.MATCHING,
    icon: '❓',
    pairs: [
      { item: 'What would Santa need if he sprained his ankle?', match: 'A Candy Cane' },
      { item: 'Why did Rudolph get a bad report card?', match: 'Because he went down in history' },
      { item: 'What kind of laundry detergent does Santa Claus like best?', match: 'Yule Tide' },
      { item: 'What do you get if you cross a vampire with a snowman?', match: 'Frostbite' },
      { item: 'What do they call break time at the North Pole?', match: 'A Santa Pause' },
      { item: 'Why did the snowman buy a bag of carrots?', match: 'He wanted to pick his nose!' },
      { item: 'How do elves clean their hands?', match: 'With Sanitizer' },
      { item: 'Where do the Elves go for a swim?', match: 'The North Pool' },
      { item: "What is a Christmas tree's favorite candy?", match: 'Orna-mints' },
      { item: 'When does Christmas come before Thanksgiving?', match: 'In the dictionary' },
      { item: 'What did one snowbank say to the other?', match: 'You get my drift?' },
      { item: 'Why did Santa go to music school?', match: 'To improve his "wrap" skills' },
      { item: "What is a snowman's favorite breakfast?", match: 'Frosted Flakes' },
      { item: 'What does the gingerbread man put on his bed?', match: 'A Cookie Sheet' },
      { item: 'What do elves learn in kindergarten?', match: 'The Elf-abet' },
    ]
  },

  // ============================================
  // CHRISTMAS COOKIE MATCH-UP (17 items)
  // ============================================
  'cookie-match': {
    id: 'cookie-match',
    title: 'Christmas Cookie Match-Up',
    description: 'Match the clue to the cookie type!',
    type: GAME_TYPES.MATCHING,
    icon: '🍪',
    pairs: [
      { item: "I'm the treat that makes your taste buds believe in magic", match: 'Magic Bars' },
      { item: 'Toy that spins in the wind', match: 'Pinwheel' },
      { item: "Bite my head off or nibble my arms, either way, I'm delicious", match: 'Gingerbread' },
      { item: 'Rolled flakes pressed together', match: 'Haystacks' },
      { item: 'Sweet and chewy, dressed in white or gold, coconut delight', match: 'Macaroons' },
      { item: 'Snap me apart to find the message I guard', match: 'Fortune' },
      { item: "I'm the cookie canvas for your most colorful creations", match: 'Sugar' },
      { item: "I'm short, but my rich flavor reaches great heights!", match: 'Shortbread' },
      { item: "I'm the cookie that's ready for a snow day every day", match: 'Snowballs' },
      { item: 'Red Christmas plant', match: 'Poinsettia' },
      { item: "I'm the cookie with wrinkles, but I'm never old-fashioned", match: 'Crinkles' },
      { item: 'Golden and buttery, I shine without needing frosting', match: 'Butter' },
      { item: 'I have a sweet jewel in my center for you to enjoy', match: 'Thumbprints' },
      { item: 'Rare wild mushroom', match: 'Truffles' },
      { item: "I'm not a doodle you draw, but a treat you devour", match: 'Snickerdoodle' },
      { item: "You'll think I'm refreshing, but I won't freshen your breath", match: 'Thin Mints' },
      { item: 'Stiffly beaten egg whites & sugar', match: 'Meringue' },
    ]
  },

  // ============================================
  // CHRISTMAS AROUND THE WORLD LANGUAGES (16 items)
  // ============================================
  'language-match': {
    id: 'language-match',
    title: 'Merry Christmas in Other Languages',
    description: 'Match the greeting to its language!',
    type: GAME_TYPES.MATCHING,
    icon: '🌐',
    pairs: [
      { item: 'Feliz Navidad', match: 'Spanish' },
      { item: 'God Jul', match: 'Swedish / Norwegian' },
      { item: 'Frohe Weihnachten', match: 'German' },
      { item: '메리 크리스마스 (Meri Keuriseumaseu)', match: 'Korean' },
      { item: 'Veselé Vánoce', match: 'Czech' },
      { item: 'Feliz Natal', match: 'Portuguese' },
      { item: 'メリークリスマス (Merī Kurisumasu)', match: 'Japanese' },
      { item: 'Buon Natale', match: 'Italian' },
      { item: 'Καλά Χριστούγεννα (Kalá Christoúgenna)', match: 'Greek' },
      { item: 'Mele Kalikimaka', match: 'Hawaiian' },
      { item: 'Hyvää joulua', match: 'Finnish' },
      { item: 'Joyeux Noël', match: 'French' },
      { item: 'Chúc Mừng Giáng Sinh', match: 'Vietnamese' },
      { item: 'عيد ميلاد مجيد (Eid Milad Majid)', match: 'Arabic' },
      { item: 'С Рождеством (S Rozhdestvom)', match: 'Russian' },
      { item: '圣诞快乐 (Shèngdàn kuàilè)', match: 'Chinese (Mandarin)' },
    ]
  },

  // ============================================
  // GUESS THE CHRISTMAS MOVIE (19 quotes)
  // ============================================
  'movie-quotes': {
    id: 'movie-quotes',
    title: 'Guess the Christmas Movie',
    description: 'Name the movie from the quote!',
    type: GAME_TYPES.FILL_BLANK,
    icon: '🎬',
    questions: [
      { id: 1, prompt: '"Buzz. Your girlfriend. Woof!"', answer: 'Home Alone', alternates: [] },
      { id: 2, prompt: '"Faith is believing in things when common sense tells you not to."', answer: 'Miracle on 34th Street', alternates: [] },
      { id: 3, prompt: '"I\'m a cotton-headed ninny muggins."', answer: 'Elf', alternates: [] },
      { id: 4, prompt: '"Save the neck for me, Clark."', answer: "National Lampoon's Christmas Vacation", alternates: ['christmas vacation'] },
      { id: 5, prompt: '"Just because you can\'t see something, doesn\'t mean it doesn\'t exist."', answer: 'The Santa Clause', alternates: ['santa clause'] },
      { id: 6, prompt: '"Looks great. Little full, lotta sap."', answer: "National Lampoon's Christmas Vacation", alternates: ['christmas vacation'] },
      { id: 7, prompt: '"Welcome to the party, pal."', answer: 'Die Hard', alternates: [] },
      { id: 8, prompt: '"Oh, Christmas isn\'t just a day, it\'s a frame of mind."', answer: 'Miracle on 34th Street', alternates: [] },
      { id: 9, prompt: '"Maybe Christmas doesn\'t come from a store."', answer: 'How the Grinch Stole Christmas', alternates: ['the grinch', 'grinch'] },
      { id: 10, prompt: '"I made my family disappear."', answer: 'Home Alone', alternates: [] },
      { id: 11, prompt: '"Every time a bell rings, an angel gets his wings."', answer: "It's a Wonderful Life", alternates: ['its a wonderful life'] },
      { id: 12, prompt: '"You smell like beef and cheese."', answer: 'Elf', alternates: [] },
      { id: 13, prompt: '"Bah, humbug."', answer: 'A Christmas Carol', alternates: ['christmas carol'] },
      { id: 14, prompt: '"Well, technically, I\'m a human, but I was raised by elves."', answer: 'Elf', alternates: [] },
      { id: 15, prompt: '"We\'re your worst nightmare...elves with attitudes."', answer: 'The Santa Clause', alternates: ['santa clause'] },
      { id: 16, prompt: '"God bless us, everyone."', answer: 'A Christmas Carol', alternates: ['christmas carol'] },
      { id: 17, prompt: '"You\'ll shoot your eye out, kid!"', answer: 'A Christmas Story', alternates: ['christmas story'] },
      { id: 18, prompt: '"I\'ve killed it. Everything I touch gets ruined."', answer: 'A Charlie Brown Christmas', alternates: ['charlie brown christmas'] },
      { id: 19, prompt: '"The most real things in the world are the things we can\'t see."', answer: 'The Polar Express', alternates: ['polar express'] },
    ]
  },

  // ============================================
  // GUESS THE CHRISTMAS CAROL (19 clues)
  // ============================================
  'carol-clues': {
    id: 'carol-clues',
    title: 'Guess the Christmas Carol',
    description: 'Decode the clever clue to find the song title!',
    type: GAME_TYPES.FILL_BLANK,
    icon: '🎼',
    questions: [
      { id: 1, prompt: 'ABCDEFGHIJKMNOPQRSTUVWXYZ (The alphabet with one letter missing)', answer: 'Noel', alternates: ['the first noel'] },
      { id: 2, prompt: "Vehicular homicide was committed on Dad's mom by a precipitous darling.", answer: 'Grandma Got Run Over by a Reindeer', alternates: [] },
      { id: 3, prompt: 'Do you perceive the same longitudinal pressure which stimulates my auditory sense organs?', answer: 'Do You Hear What I Hear', alternates: [] },
      { id: 4, prompt: 'Exuberation to this orb.', answer: 'Joy to the World', alternates: [] },
      { id: 5, prompt: 'Sir Lancelot with laryngitis.', answer: 'Silent Night', alternates: [] },
      { id: 6, prompt: 'May the Deity bestow an absence of fatigue to mild male humans.', answer: 'God Rest Ye Merry, Gentlemen', alternates: ['god rest ye merry gentlemen'] },
      { id: 7, prompt: 'Wanted in December: top forward incisors.', answer: 'All I Want for Christmas Is My Two Front Teeth', alternates: [] },
      { id: 8, prompt: 'Boulder of the tinkling metal spheres.', answer: 'Jingle Bell Rock', alternates: [] },
      { id: 9, prompt: '288 Yuletide hours.', answer: 'The Twelve Days of Christmas', alternates: ['12 days of christmas'] },
      { id: 10, prompt: 'Leave and do an elevated broadcast.', answer: 'Go Tell It on the Mountain', alternates: [] },
      { id: 11, prompt: 'Obese personification fabricated of compressed mounds of minute crystals.', answer: 'Frosty the Snowman', alternates: ['frosty'] },
      { id: 12, prompt: 'Assemble everyone who believes.', answer: 'O Come, All Ye Faithful', alternates: ['o come all ye faithful'] },
      { id: 13, prompt: 'Oh, member of the round table with missing areas.', answer: 'O Holy Night', alternates: [] },
      { id: 14, prompt: 'Frozen precipitation commence.', answer: 'Let It Snow', alternates: [] },
      { id: 15, prompt: 'Listen, the winged heavenly messengers are proclaiming tunefully.', answer: 'Hark! The Herald Angels Sing', alternates: ['hark the herald angels sing'] },
      { id: 16, prompt: 'Cup-shaped instruments fashioned of a whitish metallic element.', answer: 'Silver Bells', alternates: [] },
      { id: 17, prompt: 'We are Kong, Lear and Not Cole.', answer: 'We Three Kings', alternates: [] },
      { id: 18, prompt: 'I spied my maternal parent osculating a red-coated, unshaven teamster.', answer: 'I Saw Mommy Kissing Santa Claus', alternates: [] },
      { id: 19, prompt: 'Our fervent hope is that you thoroughly enjoy your yuletide season.', answer: 'We Wish You a Merry Christmas', alternates: [] },
    ]
  },

  // ============================================
  // MOVIE CHARACTER MATCHUP (16 items)
  // ============================================
  'character-match': {
    id: 'character-match',
    title: 'Movie Character Matchup',
    description: 'Match the character to their Christmas movie!',
    type: GAME_TYPES.MATCHING,
    icon: '🎭',
    pairs: [
      { item: 'Jack Skellington', match: 'The Nightmare Before Christmas' },
      { item: 'Ralphie Parker', match: 'A Christmas Story' },
      { item: 'George Bailey', match: "It's a Wonderful Life" },
      { item: 'Buddy', match: 'Elf' },
      { item: 'Clark Griswold', match: "National Lampoon's Christmas Vacation" },
      { item: 'Susan Walker', match: 'Miracle on 34th Street' },
      { item: 'Kevin McCallister', match: 'Home Alone' },
      { item: 'Frosty the Snowman', match: 'Frosty the Snowman' },
      { item: 'Frank Cross', match: 'Scrooged' },
      { item: 'Lucy Van Pelt', match: 'A Charlie Brown Christmas' },
      { item: 'John McClane', match: 'Die Hard' },
      { item: 'The Grinch', match: 'How the Grinch Stole Christmas' },
      { item: 'Billy Mack', match: 'Love Actually' },
      { item: 'Scott Calvin', match: 'The Santa Clause' },
      { item: 'Rudolph', match: 'Rudolph the Red-Nosed Reindeer' },
      { item: 'Ebenezer Scrooge', match: 'A Christmas Carol' },
    ]
  },
};

// Helper to get a list of all games
export const getGameList = () => {
  return Object.values(games).map(game => ({
    id: game.id,
    title: game.title,
    description: game.description,
    type: game.type,
    icon: game.icon,
    questionCount: game.questions?.length || game.pairs?.length || 0,
  }));
};

// Helper to get games by type
export const getGamesByType = (type) => {
  return Object.values(games).filter(game => game.type === type);
};

// Normalize answer for comparison
export const normalizeAnswer = (answer) => {
  return answer
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
};

// Check if answer is correct
export const checkAnswer = (userAnswer, correctAnswer, alternates = []) => {
  const normalized = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);

  if (normalized === normalizedCorrect) return true;

  for (const alt of alternates) {
    if (normalized === normalizeAnswer(alt)) return true;
  }

  return false;
};

export default games;
