
// run with "node db/seeds.js", cd into api first

require("dotenv").config();
const { connectToDatabase } = require("./db");
const Movie = require("../models/movies");

const movies = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    description:
      "Inception is a science-fiction thriller directed by Christopher Nolan starring Leonardo DiCaprio as Dom Cobb, a skilled thief who steals secrets from within dreams. He is offered a chance at redemption if he can successfully perform inception — planting an idea into someone's subconscious. The film is known for its layered dream worlds and practical effects.",
    director: "Christopher Nolan",
    image: "https://www.tallengestore.com/cdn/shop/products/Inception-LeonardoDiCaprio-ChristopherNolan-HollywoodSciFiMoviePoster_66029b94-50ae-494c-b11d-60a3d91268b5.jpg?v=1685582036",
    averageRating: 4.4
},
  {
    title: "Princess Mononoke",
    genre: "Fantasy epic",
    releaseYear: 1997,
    description:
      "Princess Mononoke is a Japanese animated fantasy epic written and directed by Hayao Miyazaki and produced by Studio Ghibli. The film follows Ashitaka, a young prince caught in a conflict between industrial humans and the spirits of the forest, including the fierce San. It is celebrated for its environmental themes, moral complexity, and sweeping animation.",
    director: "Hayao Miyazaki",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhhXRSGGpVrqeICGcpaQmvMFCe8es6eSSLTTs-tt9mENbyAZSNeeqsqnYo2P55HpCT22M&s=10",
    averageRating: 4.2
},
  {
    title: "Good Will Hunting",
    genre: "Drama",
    releaseYear: 1997,
    description:
      "Good Will Hunting is a drama directed by Gus Van Sant starring Matt Damon as a self-taught mathematical genius working as a janitor at MIT. After assaulting a police officer, he must attend therapy sessions with psychologist Sean Maguire, played by Robin Williams. The film explores trauma, identity, and untapped potential, and won Academy Awards for Best Supporting Actor and Best Original Screenplay.",
    director: "Gus Van Sant",
    image: "https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png",
    averageRating: 4.2
},
  
  {
    title: "The Dark Knight",
    genre: "Superhero crime drama",
    releaseYear: 2008,
    description:
      "The Dark Knight is a superhero crime drama directed by Christopher Nolan starring Christian Bale as Batman and Heath Ledger as the Joker. Batman faces his greatest psychological and moral challenge as the Joker unleashes chaos on Gotham City. The film is widely praised for Ledger’s iconic performance and its grounded, gritty tone.",
    director: "Christopher Nolan",
    image: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/01/IMG_5891.jpeg",
    averageRating: 4.5
},
  {
    title: "Parasite",
    genre: "Thriller drama",
    releaseYear: 2019,
    description:
      "Parasite is a South Korean thriller directed by Bong Joon-ho starring Song Kang-ho. The film follows a struggling family who cleverly infiltrate the lives of a wealthy household, leading to unexpected and explosive consequences. It became the first non-English language film to win the Academy Award for Best Picture.",
    director: "Bong Joon-ho",
    image: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    averageRating: 4.5
},
  {
    title: "Interstellar",
    genre: "Sci-fi epic",
    releaseYear: 2014,
    description:
      "Interstellar is a science-fiction epic directed by Christopher Nolan starring Matthew McConaughey as a former NASA pilot tasked with finding a new habitable planet for humanity. Traveling through a wormhole near Saturn, the crew face extreme time dilation and emotional sacrifice. The film is noted for its scientific accuracy and Hans Zimmer’s score.",
    director: "Christopher Nolan",
    image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    averageRating: 4.4
},
  {
    title: "The Social Network",
    genre: "Biographical drama",
    releaseYear: 2010,
    description:
      "The Social Network is a biographical drama directed by David Fincher starring Jesse Eisenberg as Mark Zuckerberg. The film chronicles the creation of Facebook and the legal battles that followed. It is known for Aaron Sorkin’s sharp screenplay and its exploration of ambition and betrayal.",
    director: "David Fincher",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png",
      averageRating: 3.9
},
  {
    title: "Get Out",
    genre: "Horror thriller",
    releaseYear: 2017,
    description:
      "Get Out is a horror thriller directed by Jordan Peele starring Daniel Kaluuya as a young man visiting his girlfriend’s family estate. What begins as awkward social tension escalates into something far more sinister. The film blends social commentary with psychological horror and won the Academy Award for Best Original Screenplay.",
    director: "Jordan Peele",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png",
    averageRating: 4.1
},
  {
    title: "Whiplash",
    genre: "Drama",
    releaseYear: 2014,
    description:
      "Whiplash is a drama directed by Damien Chazelle starring Miles Teller as an ambitious jazz drummer and J.K. Simmons as his ruthless instructor. The intense mentor-student dynamic pushes both characters to extremes in pursuit of greatness. The film is acclaimed for its editing and Simmons’ Oscar-winning performance.",
    director: "Damien Chazelle",
    image: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
    averageRating: 4.4
},
  {
    title: "The Grand Budapest Hotel",
    genre: "Comedy drama",
    releaseYear: 2014,
    description:
      "The Grand Budapest Hotel is a comedy drama directed by Wes Anderson starring Ralph Fiennes as Monsieur Gustave, a legendary concierge accused of murder. The film follows a whimsical European caper involving stolen art and family fortune. It is celebrated for its visual symmetry and distinctive style.",
    director: "Wes Anderson",
    image:
      "https://a.ltrbxd.com/resized/film-poster/9/5/1/1/3/95113-the-grand-budapest-hotel-0-1000-0-1500-crop.jpg?v=6ac71cf4ba",
    averageRating: 4.2
},
  {
    title: "Mad Max: Fury Road",
    genre: "Post-apocalyptic action",
    releaseYear: 2015,
    description:
      "Mad Max: Fury Road is a post-apocalyptic action film directed by George Miller starring Tom Hardy and Charlize Theron. Set in a desert wasteland, the film follows a high-speed escape from a tyrannical warlord. It is renowned for its practical stunts and relentless pacing.",
    director: "George Miller",
    image: "https://a.ltrbxd.com/resized/film-poster/6/2/7/8/0/62780-mad-max-fury-road-0-1000-0-1500-crop.jpg?v=37c5424b1f",
    averageRating: 4.2
},
  {
    title: "La La Land",
    genre: "Romantic musical drama",
    releaseYear: 2016,
    description:
      "La La Land is a romantic musical drama directed by Damien Chazelle starring Ryan Gosling and Emma Stone. The film follows two aspiring artists navigating love and ambition in Los Angeles. It is known for its vibrant cinematography and modern take on classic Hollywood musicals.",
    director: "Damien Chazelle",
    image: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
    averageRating: 4.1
},
  {
    title: "The Matrix",
    genre: "Sci-fi action",
    releaseYear: 1999,
    description:
      "The Matrix is a science-fiction action film directed by the Wachowskis starring Keanu Reeves as Neo, a hacker who discovers reality is a simulated construct. He joins a rebellion against intelligent machines controlling humanity. The film revolutionized action cinema with its bullet-time visual effects.",
    director: "The Wachowskis",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/1/8/51518-the-matrix-0-1000-0-1500-crop.jpg?v=fc7c366afe",
    averageRating: 4.2
},
  {
    title: "Joker",
    genre: "Psychological drama",
    releaseYear: 2019,
    description:
      "Joker is a psychological drama directed by Todd Phillips starring Joaquin Phoenix as Arthur Fleck, a struggling comedian descending into madness. The film explores themes of isolation and societal neglect. Phoenix won the Academy Award for Best Actor for his performance.",
    director: "Todd Phillips",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
    averageRating: 3.8
},
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    releaseYear: 1994,
    description:
      "The Shawshank Redemption is a drama directed by Frank Darabont starring Tim Robbins and Morgan Freeman. The film follows the enduring friendship between two imprisoned men over several decades. It is widely regarded as one of the greatest films ever made.",
    director: "Frank Darabont",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    averageRating: 4.6
},
  {
    title: "Gladiator",
    genre: "Historical epic",
    releaseYear: 2000,
    description:
      "Gladiator is a historical epic directed by Ridley Scott starring Russell Crowe as a betrayed Roman general seeking vengeance. Forced into slavery, he rises as a gladiator in the Colosseum. The film won the Academy Award for Best Picture.",
    director: "Ridley Scott",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/9/5/2/51952-gladiator-2000-0-1000-0-1500-crop.jpg?v=0071a74571",
    averageRating: 4.2
},
  {
    title: "Black Panther",
    genre: "Superhero action",
    releaseYear: 2018,
    description:
      "Black Panther is a superhero action film directed by Ryan Coogler starring Chadwick Boseman as T’Challa, king of Wakanda. He must defend his throne from a powerful challenger with global ambitions. The film was praised for its cultural impact and world-building.",
    director: "Ryan Coogler",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg",
    averageRating: 3.7
},
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy adventure",
    releaseYear: 2001,
    description:
      "The Fellowship of the Ring is a fantasy adventure directed by Peter Jackson starring Elijah Wood as Frodo Baggins. Frodo embarks on a perilous journey to destroy a powerful ring that threatens Middle-earth. The film launched an acclaimed trilogy based on J.R.R. Tolkien’s novels.",
    director: "Peter Jackson",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg",
    averageRating: 4.4
},
  {
    title: "The Silence of the Lambs",
    genre: "Psychological thriller",
    releaseYear: 1991,
    description:
      "The Silence of the Lambs is a psychological thriller directed by Jonathan Demme starring Jodie Foster and Anthony Hopkins. An FBI trainee seeks help from imprisoned cannibal Hannibal Lecter to catch another serial killer. The film won five major Academy Awards including Best Picture.",
    director: "Jonathan Demme",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
    averageRating: 4.3
},
  {
    title: "Avengers: Endgame",
    genre: "Superhero epic",
    releaseYear: 2019,
    description:
      "Avengers: Endgame is a superhero epic directed by Anthony and Joe Russo starring Robert Downey Jr. and Chris Evans. The surviving Avengers attempt to reverse the devastation caused by Thanos. The film became one of the highest-grossing films of all time.",
    director: "Anthony and Joe Russo",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    averageRating: 4.0
},
  {
    title: "Fight Club",
    genre: "Psychological drama",
    releaseYear: 1999,
    description:
      "Fight Club is a psychological drama directed by David Fincher starring Edward Norton and Brad Pitt. An insomniac office worker forms an underground fight club that spirals into anarchic rebellion. The film gained cult status for its provocative themes.",
    director: "David Fincher",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
    averageRating: 4.3
},
  {
    title: "Titanic",
    genre: "Romantic epic",
    releaseYear: 1997,
    description:
      "Titanic is a romantic epic directed by James Cameron starring Leonardo DiCaprio and Kate Winslet. The film tells the tragic love story of two passengers aboard the ill-fated RMS Titanic. It became one of the most successful films in cinematic history.",
    director: "James Cameron",
    image: "https://a.ltrbxd.com/resized/film-poster/5/1/5/2/4/51524-titanic-0-1000-0-1500-crop.jpg?v=7517ea94ce",
    averageRating: 3.8
},
  {
    title: "Perchance",
    genre: "Indie drama",
    releaseYear: 2024,
    description:
      "Perchance is an independent drama following two strangers who form an unlikely connection over a single night in a quiet coastal town. As conversations unfold, hidden regrets and unrealized dreams surface, forcing both to confront the paths they’ve chosen. The film is noted for its intimate performances and minimalist storytelling.",
    director: "Ava Laurent",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2YzMTJiMzItNDQzZi00MzFmLTlmOGYtYmJkNWQ1ZjU0MGYzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    averageRating: 3
},
  {
    title: "Blade Runner",
    genre: "Sci-Fi",
    releaseYear: 1982,
    description:
      "Blade Runner is a science-fiction film directed by Ridley Scott starring Harrison Ford as a blade runner tasked with hunting down replicants in a dystopian Los Angeles. The film explores identity, humanity, and memory and has influenced decades of sci-fi cinema with its neo-noir visuals.",
    director: "Ridley Scott",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png",
    averageRating: 4.2
},
  {
    title: "Pan's Labyrinth",
    genre: "Fantasy epic",
    releaseYear: 2006,
    description:
      "Pan's Labyrinth is a dark fantasy epic written and directed by Guillermo del Toro. Set in post-Civil War Spain, a young girl discovers a mysterious labyrinth and a faun who tells her she is a long-lost princess. The film blends brutal reality with fairy-tale wonder and won three Academy Awards.",
    director: "Guillermo del Toro",
    image: "https://upload.wikimedia.org/wikipedia/en/6/67/Pan%27s_Labyrinth.jpg",
    averageRating: 4.3
},
  {
    title: "12 Years a Slave",
    genre: "Drama",
    releaseYear: 2013,
    description:
      "12 Years a Slave is a historical drama directed by Steve McQueen starring Chiwetel Ejiofor as Solomon Northup, a free Black man kidnapped and sold into slavery. The film depicts his struggle to survive and regain his freedom. It won the Academy Award for Best Picture.",
    director: "Steve McQueen",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5c/12_Years_a_Slave_film_poster.jpg",
    averageRating: 4.1
},
  {
    title: "Zodiac",
    genre: "Thriller drama",
    releaseYear: 2007,
    description:
      "Zodiac is a thriller drama directed by David Fincher starring Jake Gyllenhaal, Robert Downey Jr., and Mark Ruffalo. The film follows the real-life investigation of the Zodiac Killer in the San Francisco Bay Area and the obsession it breeds in those who pursue the case.",
    director: "David Fincher",
    image: "https://a.ltrbxd.com/resized/sm/upload/58/tf/z6/gw/qKQIjErYaN149hZRP5Vgf8RoC7S-0-230-0-345-crop.jpg?v=72ee5db942",
    averageRating: 4.0
},
  {
    title: "Arrival",
    genre: "Sci-fi epic",
    releaseYear: 2016,
    description:
      "Arrival is a science-fiction epic directed by Denis Villeneuve starring Amy Adams as a linguist recruited to communicate with mysterious alien spacecraft. The film explores language, time, and human connection and was nominated for eight Academy Awards including Best Picture.",
    director: "Denis Villeneuve",
    image: "https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg",
    averageRating: 4.2
},
  {
    title: "The King's Speech",
    genre: "Biographical drama",
    releaseYear: 2010,
    description:
      "The King's Speech is a biographical drama directed by Tom Hooper starring Colin Firth as King George VI, who struggles with a stammer on the eve of World War II. With the help of an unorthodox speech therapist, he finds his voice when his country needs it most. The film won the Academy Award for Best Picture.",
    director: "Tom Hooper",
    image: "https://i0.wp.com/moviemovesme.com/wp-content/uploads/2022/03/14029-the-kings-speech.jpg?fit=500%2C750&ssl=1",
    averageRating: 4.0
},
  {
    title: "A Quiet Place",
    genre: "Horror thriller",
    releaseYear: 2018,
    description:
      "A Quiet Place is a horror thriller directed by John Krasinski starring Emily Blunt and Krasinski as parents protecting their family in a world overrun by sound-hunting creatures. The family must live in silence to survive. The film was praised for its tension and inventive premise.",
    director: "John Krasinski",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a0/A_Quiet_Place_film_poster.png",
    averageRating: 4.0
},
  {
    title: "Little Miss Sunshine",
    genre: "Comedy drama",
    releaseYear: 2006,
    description:
      "Little Miss Sunshine is a comedy drama directed by Jonathan Dayton and Valerie Faris starring Greg Kinnear, Toni Collette, and Steve Carell. A dysfunctional family drives cross-country so their daughter can compete in a child beauty pageant. The film won the Academy Award for Best Original Screenplay.",
    director: "Jonathan Dayton and Valerie Faris",
    image: "https://upload.wikimedia.org/wikipedia/en/1/16/Little_miss_sunshine_poster.jpg",
    averageRating: 4.1
},
  {
    title: "Chicago",
    genre: "Romantic musical drama",
    releaseYear: 2002,
    description:
      "Chicago is a romantic musical drama directed by Rob Marshall starring Renée Zellweger, Catherine Zeta-Jones, and Richard Gere. Set in the jazz age, two murderous showgirls compete for fame and the attention of a slick lawyer. The film won the Academy Award for Best Picture.",
    director: "Rob Marshall",
    image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Chicago_%282002_film%29.png",
    averageRating: 3.9
},
  {
    title: "Edge of Tomorrow",
    genre: "Sci-fi action",
    releaseYear: 2014,
    description:
      "Edge of Tomorrow is a science-fiction action film directed by Doug Liman starring Tom Cruise and Emily Blunt. A military officer is caught in a time loop during an alien invasion, reliving the same day and becoming a better soldier each time. The film is known for its clever premise and tight action.",
    director: "Doug Liman",
    image: "https://upload.wikimedia.org/wikipedia/en/f/f9/Edge_of_Tomorrow_Poster.jpg",
    averageRating: 4.0
},
  {
    title: "Braveheart",
    genre: "Historical epic",
    releaseYear: 1995,
    description:
      "Braveheart is a historical epic directed by and starring Mel Gibson as William Wallace, a Scottish warrior who leads his countrymen in a rebellion against English rule. The film depicts battles, betrayal, and sacrifice and won five Academy Awards including Best Picture and Best Director.",
    director: "Mel Gibson",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Braveheart_film_poster.png",
    averageRating: 4.0
},
  {
    title: "Spirited Away",
    genre: "Fantasy adventure",
    releaseYear: 2001,
    description:
      "Spirited Away is a fantasy adventure written and directed by Hayao Miyazaki and produced by Studio Ghibli. A young girl enters a spirit world and must work in a bathhouse to free her parents and find her way home. The film won the Academy Award for Best Animated Feature.",
    director: "Hayao Miyazaki",
    image: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
    averageRating: 4.4
},
  {
    title: "Shutter Island",
    genre: "Psychological thriller",
    releaseYear: 2010,
    description:
      "Shutter Island is a psychological thriller directed by Martin Scorsese starring Leonardo DiCaprio as a U.S. Marshal investigating a disappearance at a psychiatric facility on a remote island. As the investigation deepens, reality and delusion blur. The film is known for its twist ending.",
    director: "Martin Scorsese",
    image: "https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg",
    averageRating: 4.1
},
  {
    title: "Spider-Man: Into the Spider-Verse",
    genre: "Superhero action",
    releaseYear: 2018,
    description:
      "Spider-Man: Into the Spider-Verse is a superhero action film directed by Bob Persichetti, Peter Ramsey, and Rodney Rothman. Teen Miles Morales becomes Spider-Man and teams up with alternate-dimension Spider-people to save the multiverse. The film won the Academy Award for Best Animated Feature for its groundbreaking animation.",
    director: "Bob Persichetti, Peter Ramsey, and Rodney Rothman",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fa/Spider-Man_Into_the_Spider-Verse_poster.png",
    averageRating: 4.4
},
  {
    title: "Lady Bird",
    genre: "Indie drama",
    releaseYear: 2017,
    description:
      "Lady Bird is an independent drama written and directed by Greta Gerwig starring Saoirse Ronan as a strong-willed teenager navigating her final year of high school, first love, and a strained relationship with her mother in Sacramento. The film was nominated for five Academy Awards including Best Picture.",
    director: "Greta Gerwig",
    image: "https://upload.wikimedia.org/wikipedia/en/6/61/Lady_Bird_poster.jpeg",
    averageRating: 4.1
},
  {
    title: "The Florida Project",
    genre: "Indie drama",
    releaseYear: 2017,
    description:
      "The Florida Project is an independent drama directed by Sean Baker starring Brooklynn Prince as a six-year-old living with her mother in a budget motel near Disney World. The film paints a vivid portrait of childhood and poverty on the margins of American life and was acclaimed for its naturalistic performances.",
    director: "Sean Baker",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b2/The_Florida_Project.jpg",
    averageRating: 4.2
},
  {
    title: "Juno",
    genre: "Indie drama",
    releaseYear: 2007,
    description:
      "Juno is an independent drama directed by Jason Reitman starring Elliot Page as a pregnant teenager who decides to give her baby up for adoption. The film balances humour and heart with Diablo Cody's Oscar-winning screenplay and was a critical and commercial success.",
    director: "Jason Reitman",
    image: "https://upload.wikimedia.org/wikipedia/en/3/36/Junoposter2007.png",
    averageRating: 4.0
},
  {
    title: "Frances Ha",
    genre: "Indie drama",
    releaseYear: 2012,
    description:
      "Frances Ha is an independent drama directed by Noah Baumbach starring Greta Gerwig as an aspiring dancer in New York navigating friendship, ambition, and uncertainty in her late twenties. Shot in black and white, the film is celebrated for its wit and emotional authenticity.",
    director: "Noah Baumbach",
    image: "https://upload.wikimedia.org/wikipedia/en/6/69/Frances_Ha_poster.png",
    averageRating: 4.0
},
  {
    title: "Moonlight",
    genre: "Indie drama",
    releaseYear: 2016,
    description:
      "Moonlight is an independent drama directed by Barry Jenkins following a young Black man through three stages of his life in Miami as he grapples with identity, family, and love. The film won the Academy Award for Best Picture and is renowned for its visual poetry and restraint.",
    director: "Barry Jenkins",
    image: "https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29.png",
    averageRating: 4.2
},
  {
    title: "Indiana Jones and the Raiders of the Lost Ark",
    genre: "Fantasy adventure",
    releaseYear: 1981,
    description:
      "Raiders of the Lost Ark is a fantasy adventure directed by Steven Spielberg starring Harrison Ford as archaeologist Indiana Jones, who races against Nazis to find the biblical Ark of the Covenant. The film defined the action-adventure genre and remains a beloved classic.",
    director: "Steven Spielberg",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4c/Raiders_of_the_Lost_Ark.jpg",
    averageRating: 4.4
},
  {
    title: "Jurassic Park",
    genre: "Fantasy adventure",
    releaseYear: 1993,
    description:
      "Jurassic Park is a fantasy adventure directed by Steven Spielberg based on Michael Crichton's novel. When a theme park of cloned dinosaurs goes wrong, a small group must survive. The film pioneered CGI effects and became a cultural phenomenon.",
    director: "Steven Spielberg",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    averageRating: 4.2
},
  {
    title: "The Princess Bride",
    genre: "Fantasy adventure",
    releaseYear: 1987,
    description:
      "The Princess Bride is a fantasy adventure directed by Rob Reiner about a farmhand who must rescue his true love from a villainous prince. Told as a story within a story, the film blends romance, swordplay, and comedy and has endured as a cult favourite.",
    director: "Rob Reiner",
    image: "https://upload.wikimedia.org/wikipedia/en/d/db/Princess_bride.jpg",
    averageRating: 4.3
},
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    genre: "Fantasy adventure",
    releaseYear: 2003,
    description:
      "Pirates of the Caribbean: The Curse of the Black Pearl is a fantasy adventure directed by Gore Verbinski starring Johnny Depp as Captain Jack Sparrow. A blacksmith and a governor's daughter team up with Sparrow to rescue her from cursed pirates. The film launched a blockbuster franchise.",
    director: "Gore Verbinski",
    image: "https://upload.wikimedia.org/wikipedia/en/8/89/Pirates_of_the_Caribbean_-_The_Curse_of_the_Black_Pearl.png",
    averageRating: 4.0
},
  {
    title: "The Shining",
    genre: "Horror thriller",
    releaseYear: 1980,
    description:
      "The Shining is a horror thriller directed by Stanley Kubrick starring Jack Nicholson as a writer who takes a job as winter caretaker of an isolated hotel. As supernatural forces close in, his sanity unravels. The film is regarded as one of the greatest horror films ever made.",
    director: "Stanley Kubrick",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
    averageRating: 4.3
},
  {
    title: "Hereditary",
    genre: "Horror thriller",
    releaseYear: 2018,
    description:
      "Hereditary is a horror thriller directed by Ari Aster starring Toni Collette as a mother grappling with grief and dark family secrets after a tragedy. The film builds dread through atmosphere and performance and was hailed as a modern horror masterpiece.",
    director: "Ari Aster",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d9/Hereditary.png",
    averageRating: 4.1
},
  {
    title: "Alien",
    genre: "Horror thriller",
    releaseYear: 1979,
    description:
      "Alien is a horror thriller directed by Ridley Scott starring Sigourney Weaver as Ellen Ripley. The crew of a commercial spacecraft encounter a deadly extraterrestrial creature. The film combined sci-fi and horror and launched one of cinema's most iconic franchises.",
    director: "Ridley Scott",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
    averageRating: 4.4
},
  {
    title: "The Babadook",
    genre: "Horror thriller",
    releaseYear: 2014,
    description:
      "The Babadook is a horror thriller directed by Jennifer Kent starring Essie Davis as a widowed mother whose son's fear of a storybook monster may be more than imagination. The film uses horror to explore grief and trauma and was widely acclaimed.",
    director: "Jennifer Kent",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d7/The-Babadook-Poster.jpg",
    averageRating: 4.0
},
  {
    title: "Ray",
    genre: "Biographical drama",
    releaseYear: 2004,
    description:
      "Ray is a biographical drama directed by Taylor Hackford starring Jamie Foxx as Ray Charles, from his rise in the music industry to his struggles with addiction and blindness. Foxx won the Academy Award for Best Actor for his transformative performance.",
    director: "Taylor Hackford",
    image: "https://upload.wikimedia.org/wikipedia/en/2/2b/Ray_poster.jpg",
    averageRating: 4.0
},
  {
    title: "Walk the Line",
    genre: "Biographical drama",
    releaseYear: 2005,
    description:
      "Walk the Line is a biographical drama directed by James Mangold starring Joaquin Phoenix as Johnny Cash and Reese Witherspoon as June Carter. The film traces Cash's career, addiction, and romance with Carter. Witherspoon won the Academy Award for Best Actress.",
    director: "James Mangold",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5a/Walk_the_line_poster.jpg",
    averageRating: 4.0
},
  {
    title: "Lincoln",
    genre: "Biographical drama",
    releaseYear: 2012,
    description:
      "Lincoln is a biographical drama directed by Steven Spielberg starring Daniel Day-Lewis as President Abraham Lincoln during the final months of the Civil War as he fights to pass the Thirteenth Amendment. Day-Lewis won the Academy Award for Best Actor.",
    director: "Steven Spielberg",
    image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Lincoln_2012_Teaser_Poster.jpg",
    averageRating: 4.0
},
  {
    title: "Schindler's List",
    genre: "Historical epic",
    releaseYear: 1993,
    description:
      "Schindler's List is a historical epic directed by Steven Spielberg starring Liam Neeson as Oskar Schindler, a German industrialist who saves over a thousand Jewish lives during the Holocaust. The film won seven Academy Awards including Best Picture and is shot in black and white.",
    director: "Steven Spielberg",
    image: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
    averageRating: 4.5
},
  {
    title: "Lawrence of Arabia",
    genre: "Historical epic",
    releaseYear: 1962,
    description:
      "Lawrence of Arabia is a historical epic directed by David Lean starring Peter O'Toole as T.E. Lawrence during the Arab Revolt against the Ottoman Empire. The film is celebrated for its sweeping desert cinematography and won seven Academy Awards including Best Picture.",
    director: "David Lean",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lawrence_of_arabia_ver3_xxlg.jpg/500px-Lawrence_of_arabia_ver3_xxlg.jpg",
    averageRating: 4.4
},
  {
    title: "Ben-Hur",
    genre: "Historical epic",
    releaseYear: 1959,
    description:
      "Ben-Hur is a historical epic directed by William Wyler starring Charlton Heston as a Jewish prince betrayed and enslaved by the Romans who seeks vengeance. The film won 11 Academy Awards including Best Picture and features one of cinema's most famous chariot races.",
    director: "William Wyler",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Ben_hur_1959_poster.jpg/500px-Ben_hur_1959_poster.jpg",
    averageRating: 4.2
},
  {
    title: "The Notebook",
    genre: "Romantic epic",
    releaseYear: 2004,
    description:
      "The Notebook is a romantic epic directed by Nick Cassavetes starring Ryan Gosling and Rachel McAdams as a couple whose love story is told from a nursing home decades later. The film became a defining romance of its era and a lasting fan favourite.",
    director: "Nick Cassavetes",
    image: "https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg",
    averageRating: 3.9
},
  {
    title: "Eternal Sunshine of the Spotless Mind",
    genre: "Romantic epic",
    releaseYear: 2004,
    description:
      "Eternal Sunshine of the Spotless Mind is a romantic epic directed by Michel Gondry starring Jim Carrey and Kate Winslet as former lovers who undergo a procedure to erase each other from their memories. The film blends sci-fi and romance and won the Academy Award for Best Original Screenplay.",
    director: "Michel Gondry",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png",
    averageRating: 4.3
},
  {
    title: "Casablanca",
    genre: "Romantic epic",
    releaseYear: 1942,
    description:
      "Casablanca is a romantic epic directed by Michael Curtiz starring Humphrey Bogart and Ingrid Bergman as former lovers reunited in wartime Morocco. As they confront the past and the war, they must choose between love and duty. The film is often cited as one of the greatest ever made.",
    director: "Michael Curtiz",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CasablancaPoster-Gold.jpg/500px-CasablancaPoster-Gold.jpg",
    averageRating: 4.5
},
];

async function seed() {
  await connectToDatabase();
  await Movie.deleteMany({});   // clears existing movies first
  await Movie.insertMany(movies);
  console.log("Seeded movies!");
  process.exit(0);
}

seed();
