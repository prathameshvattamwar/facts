const facts = [
    "The speed of light is 299,792,458 meters per second. Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
    "A blue whale's heart is the size of a small car and beats only 4-8 times per minute.",
    "There's enough DNA in the human body to stretch from the Sun to Pluto and back 17 times.",
    "Honey never spoils. Archaeologists have found 3000-year-old honey in ancient Egyptian tombs that is still edible.",
    "A day on Venus is longer than its year. It takes Venus 243 Earth days to rotate on its axis but only 225 Earth days to orbit the Sun.",
    "The human brain can process images that the eyes see for as little as 13 milliseconds.",
    "The Milky Way galaxy is about 100,000 light-years across and contains over 100 billion stars.",
    "An octopus has three hearts, nine brains, and blue blood.",
    "Bananas are berries, but strawberries aren't! Botanically speaking, bananas are berries while strawberries are accessory fruits.",
    "The coldest natural temperature ever recorded on Earth was -89.2°C (-128.6°F) in Antarctica.",
    "The average cumulus cloud weighs around 1.1 million pounds due to the water it contains.",
    "Sharks are older than trees. The first sharks appeared around 450 million years ago, while trees appeared around 350 million years ago.",
    "The human body contains enough carbon to make around 900 pencils.",
    "A bolt of lightning can reach temperatures hotter than the surface of the sun.",
    "The longest recorded flight of a chicken is 13 seconds.",
    "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
    "A teaspoon of neutron star would weigh about 6 billion tons.",
    "The human eye can distinguish between approximately 10 million different colors.",
    "Honeybees can recognize human faces.",
    "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron structure.",
    "Elon Musk's wealth is over ₹31,87,20,000 crore! If he gave every Indian an equal share, each person would get around ₹2.18 lakh.",
    "Water expands when frozen. That's why ice floats on water instead of sinking.",
    "A lightning bolt is five times hotter than the surface of the Sun!",
    "The speed of light is 299,792,458 meters per second. Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
    "The human body has 206 bones, but babies are born with around 300. Some bones fuse together as they grow.",
    "Earth's gravity isn't the same everywhere. Places with denser materials underground have slightly stronger gravity.",
    "Sound travels about 4.3 times faster in water than in air. That’s why underwater sounds feel distorted.",
    "The Great Wall of China is around 21,196 km long. That’s over 5 times the width of the USA!",
    "An astronaut’s height increases by about 2 inches in space because of the reduced gravitational force on their spine.",
    "One kilogram of uranium-235 can produce energy equivalent to burning about 3,000 tons of coal!",
    "There are more trees on Earth than stars in the Milky Way galaxy.",
    "If you fold a piece of paper 42 times, it would reach the Moon.",
    "There are more ways to shuffle a deck of cards than there are atoms in the observable universe.",
    "If Betelgeuse (a red supergiant star) explodes, it will be as bright as the full moon on Earth.",
    "Every 7 years, your body replaces every single cell except for some parts of your brain.",
    "If you could drive straight up, you'd reach space in just an hour.",
    "Bananas are berries, but strawberries aren't!",
    "A teaspoon of honey is the life's work of 12 bees.",
    "There’s a species of jellyfish that can live forever.",
    "A day on Venus is longer than a year on Venus.",
    "Octopuses have three hearts and blue blood.",
    "If you remove all the empty space in atoms, the entire human race could fit inside a sugar cube.",
    "There's a gas cloud in space that smells like rum and tastes like raspberries.",
    "There’s a planet called 55 Cancri e where it rains molten lava.",
    "If you drilled a hole through Earth and jumped in, you would emerge on the other side in 42 minutes.",
    "A human sneeze travels about 100 mph.",
    "There's enough DNA in your body to stretch from the Sun to Pluto and back—17 times.",
    "Your stomach gets a new lining every 3 to 4 days to prevent digesting itself.",
    "The Eiffel Tower can grow taller in summer due to heat expansion.",
    "Sharks are older than trees, existing for over 400 million years.",
    "There is a microscopic animal called the Tardigrade that can survive in space.",
    "A neutron star is so dense that a sugar-cube-sized amount of its material weighs more than a mountain.",
    "If the Sun were the size of a basketball, Earth would be the size of a sesame seed.",
    "You can't burp in space because there's no gravity to separate liquids and gases in your stomach.",
    "A cockroach can live for weeks without its head because it breathes through tiny holes in its body.",
    "Your bones are about 5 times stronger than steel of the same density.",
    "A blue whale's heart is the size of a small car.",
    "A flea can jump 350 times its body length.",
    "Jupiter has a storm (the Great Red Spot) that has been raging for at least 350 years.",
    "There’s an island in Japan where bunnies roam freely, and another in the Bahamas full of swimming pigs!",
    "If you drilled a hole through Earth and jumped in, it would take about 42 minutes to reach the other side.",
    "A single bolt of lightning contains enough energy to toast 100,000 slices of bread.",
    "The entire internet weighs about as much as a strawberry.",
    "The average cloud weighs around 500,000 kg, yet it floats effortlessly in the sky.",
    "You are more likely to be bitten by a person in New York than by a shark.",
    "Some turtles can breathe through their butts.",
    "The human nose can detect over 1 trillion different scents.",
    "Hot water freezes faster than cold water in certain conditions (Mpemba Effect).",
    "A day on Mars is just 37 minutes longer than a day on Earth.",
    "If you scream for 8 years, 7 months, and 6 days, you would generate enough sound energy to heat a cup of coffee.",
    "More people are killed by vending machines than by sharks every year.",
    "There are more bacteria in your mouth than there are people on Earth.",
    "Ants have been farming for millions of years—long before humans.",
    "You swallow about 1 liter of snot every day without realizing it.",
    "Your skin completely replaces itself every month.",
    "The first person to walk on Mars is probably already alive today.",
    "The human brain generates more electrical impulses daily than all the telephones in the world combined.",
    "Butterflies can taste with their feet.",
    "If you put Saturn in water, it would float because it's less dense than water.",
    "A strawberry isn’t actually a berry, but a banana is.",
    "There’s a species of fungus that turns ants into 'zombies'.",
    "There are more planes in the ocean than submarines in the sky.",
    "Half the world's population is within a 5000 km radius of China.",
    "An octopus has nine brains and can change color in a split second.",
    "Some fish can recognize themselves in a mirror, just like humans.",
    "The shortest war in history lasted just 38 to 45 minutes (Anglo-Zanzibar War).",
    "Venus is the hottest planet in the solar system, even though Mercury is closer to the Sun.",
    "There is a basketball court on the top floor of the U.S. Supreme Court, called 'The Highest Court in the Land.'",
    "Every year, we lose about 1% of our memories while gaining new ones.",
    "Your body produces enough heat in 30 minutes to boil a liter of water.",
    "There's enough gold in Earth's core to coat the planet in a layer 1.5 feet thick.",
    "There's a small village in Norway where the sun doesn’t set for months in summer and doesn’t rise for months in winter.",
    "Cats can make over 100 different sounds, while dogs can make only about 10.",
    "If the Earth stopped spinning suddenly, the atmosphere would still be moving at 1,600 km/h and wipe everything away.",
    "Your brain operates on the same amount of power as a 10-watt light bulb.",
    "If you uncoiled the DNA in all your cells, it would stretch to Pluto and back multiple times.",
    "The Statue of Liberty used to be brown before it turned green due to oxidation.",
    "You are technically 0.2 inches taller in the morning than at night due to gravity compressing your spine.",
    "Some whales can hold their breath for over two hours.",
    "The 'M’s' in M&M’s stand for Mars and Murrie, the business partners who created the candy.",
    "A piece of neutron star material the size of a sugar cube weighs about a billion tons!",
    "If humans had eagle vision, we could see an ant crawling on the ground from a building 10 stories high.",
    "There’s a star called ‘HD 140283’ that is estimated to be older than the universe itself, defying all known physics!",
    "Your blood vessels, if stretched end to end, could wrap around Earth nearly 2.5 times!",
];