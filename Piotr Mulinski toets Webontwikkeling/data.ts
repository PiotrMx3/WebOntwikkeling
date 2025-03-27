import { Post, Profile } from "./types";

const posts: Post[] = [
    {
        name: "Leon Zusk",
        username: "LeonZusk",
        text: "Today, I redefine social media. Y is not just a platform; it’s the birth of the next human evolution. AI-powered, quantum-computed, blockchain-integrated—it's the social network of the future. 🌍🚀 #Yvolution",
        createdOn: new Date()
    },
    {
        name: "Zark Muckerborg",
        username: "MetaverseZark",
        text: "Bold move, @LeonZusk. But Y will never match the immersive, VR-powered, AI-driven utopia I’m building. My latest project, FaceSphere, is a 16D simulation of existence. Who needs the real world? 🤖🌎 #MetaverseDomination",
        createdOn: new Date()
    },
    {
        name: "Joff Bozman",
        username: "JoffBozman",
        text: "You fools are still debating social media? Meanwhile, I'm colonizing the moons of Jupiter. Enjoy your petty internet wars while I terraform Ganymede. 🌕🚀 #BozmanGalacticFleet",
        createdOn: new Date()
    },
    {
        name: "Timothy Cookson",
        username: "TimCookson",
        text: "Introducing iY—a proprietary, minimalist version of @LeonZusk’s platform. It has no text, no images, just vibes. Perfectly designed. Costs $1,999.99. #ThinkUniquely",
        createdOn: new Date()
    },
    {
        name: "Bilbo Gateson",
        username: "GatesonSoft",
        text: "@LeonZusk Congrats on Y, but can it run on GatesSoft Millennium Edition? Asking for a friend. 🤔 #Windows4Life",
        createdOn: new Date()
    },
    {
        name: "Zark Muckerborg",
        username: "MetaverseZark",
        text: "Forget Y—let’s settle this in the metaverse ring. @LeonZusk, I challenge you to a VR cage fight. You and your outdated keyboard vs. my AI-powered, cybernetic fists. 🥊🤖 #UltimateTechFight",
        createdOn: new Date()
    },
    {
        name: "Leon Zusk",
        username: "LeonZusk",
        text: "Challenge accepted, @MetaverseZark. But why fight in VR when we can box on Mars? Low gravity means super punches. Let’s settle this like true technokings. 🚀🥊 #MartianMelee",
        createdOn: new Date()
    },
    {
        name: "Joff Bozman",
        username: "JoffBozman",
        text: "I’ll host the fight on Bozman Stream. Also, VIP tickets to watch from orbit are available for $999,999.99. Limited seats left. 🚀💰 #BozmanGalacticFightNight",
        createdOn: new Date()
    },
    {
        name: "Timothy Cookson",
        username: "TimCookson",
        text: "iFight™️ now available. The Pear Boxing Experience. Comes with a 30-second battery life and requires a $199/month subscription. 🍐🥊 #ThinkUniquelyButPayMore",
        createdOn: new Date()
    },
    {
        name: "Leon Zusk",
        username: "LeonZusk",
        text: "The future of combat is here. Martian Boxing AI™ will optimize every punch in real-time using GPT-9. Fighters will receive Neuralink battle strategies mid-fight. 🥊🤯 #TechVsMuscle",
        createdOn: new Date()
    },
    {
        name: "Bilbo Gateson",
        username: "GatesonSoft",
        text: "Can we do this fight in GatesSoft Teams instead? I have a PowerPoint about the advantages of virtual combat. 📊😎 #ProductivityFirst",
        createdOn: new Date()
    }
];

const profiles: Profile[] = [
    {
        username: "LeonZusk",
        name: "Leon Zusk",
        bio: "Tech overlord. Bored of Earth, moving to Mars. Father of AI, King of Y, master of Martian Boxing. 🚀🥊"
    },
    {
        username: "MetaverseZark",
        name: "Zark Muckerborg",
        bio: "CEO of FaceSphere. Obsessed with VR, AI, and total control. Training for the ultimate cyber fight. 🤖🥊"
    },
    {
        username: "JoffBozman",
        name: "Joff Bozman",
        bio: "Founder of Bozman Galactic Fleet™. Terraforming Jupiter while selling Bozman Prime Subscriptions. 🚀💰"
    },
    {
        username: "TimCookson",
        name: "Timothy Cookson",
        bio: "Minimalist billionaire. Invented iVibes™️. Charging $1,999.99 for this bio. 🍐"
    },
    {
        username: "GatesonSoft",
        name: "Bilbo Gateson",
        bio: "Inventor of GatesSoft Millennium Edition. Billionaire and PowerPoint enthusiast. 💾📊"
    },
    { 
        username: "JonDoe",
        name: "Jon Doe",
        bio: "Mysterious cyber anarchist. Founder of The People's Web, builder of HackNet OS, sworn enemy of corporate overlords. Lives in an undisclosed bunker, probably near Chernobyl. 🕶️💻",
    }
];

export const getTrends = () => {
    // Not implemented
    return [];
}

export const getPosts = () => {
    return posts;
}

export const getPostsByUsername = (username: string) => {
    // Not implemented
    return posts.filter(user => user.username.toLowerCase() === username.toLowerCase()); 
}

export const getProfileByUsername = (username: string) => {
    // Not implemented
    return profiles.find(user => user.username.toLowerCase() === username.toLowerCase()); 
}

export const createPost = (post: Post) => {
    posts.push(post);
}
