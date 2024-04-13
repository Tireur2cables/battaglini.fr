export const TECHNOLOGIES = [
    /* - - Center - - */
    {
        name: "nicolas",
        displayName: "Nicolas Battaglini",
        caption: "Cybersecurity engineer",
        description: "Creator of this amazing website representing the main technologies he used on his servers.",
        radius: 695508,
        orbitalVelocity: 0,
        orbitalRadius: 0,
        scaledOrbitalRadius: 0,
        rotationVelocity: 0,
        orbitalInclination: 0,
        axialTilt: 0,
    },
    /* - - Center - - */

    /* - - Orbit around center - - */
    {
        name: "anytype",
        displayName: "Anytype",
        caption: "Note taking app",
        description: "A note taking app which encrypt your data and synchronized it between several nodes. You can self-host your nodes. This is a great alternative to Notion.",
        containerManager: "Podman",
        sourceCode: "https://github.com/orgs/anyproto/repositories",
        radius: 2439.7,
        orbitalVelocity: 47.9, 
        orbitObject: "nicolas",
        orbitalRadius: 57909050, 
        scaledOrbitalRadius: 24, 
        rotationVelocity: 0,
        orbitalInclination: 7,
        axialTilt: 0,
    },
    {
        name: "languagetool",
        displayName: "Language Tool",
        caption: "Writting assistant",
        description: "LanguageTool is an AI-based spelling, style, and grammar checker that helps correct or paraphrase texts across languages.",
        containerManager: "Podman",
        sourceCode: "https://github.com/languagetool-org/languagetool",
        radius: 6051.8,
        orbitalVelocity: 35.0, 
        orbitObject: "nicolas",
        orbitalRadius: 108200000, 
        scaledOrbitalRadius: 31, 
        rotationVelocity: 0,
        orbitalInclination: 3.4,
        axialTilt: 0,
    },
    {
        name: "gitlab",
        displayName: "GitLab",
        caption: "DevSecOps platform",
        description: "Amazing platform to manage your DevSecOps projects. Basically this is a self-hostable, open source GitHub.",
        containerManager: "Podman",
        sourceCode: "https://gitlab.com/gitlab-org/gitlab",
        radius: 6371,
        orbitalVelocity: 29.8,
        orbitObject: "nicolas",
        orbitalRadius: 149600000, 
        scaledOrbitalRadius: 37,
        rotationVelocity: 0,
        orbitalInclination: 0,
        axialTilt: 0,
    },
    {
        name: "wireguard",
        displayName: "Wireguard",
        caption: "VPN",
        description: "WireGuard is an extremely simple yet fast and modern VPN that utilizes state-of-the-art cryptography.",
        sourceCode: "https://github.com/orgs/WireGuard/repositories",
        radius: 3389.5,
        orbitalVelocity: 24.1, 
        orbitObject: "nicolas",
        orbitalRadius: 227939366, 
        scaledOrbitalRadius: 45, 
        rotationVelocity: 0,
        orbitalInclination: 1.8,
        axialTilt: 0,
    },
    {
        name: "nginx",
        displayName: "Nginx",
        caption: "Web server / proxy",
        description: "nginx [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server.",
        sourceCode: "https://github.com/nginx/nginx",
        radius: 69911,
        orbitalVelocity: 24.1, 
        orbitObject: "nicolas",
        orbitalRadius: 778412027, 
        scaledOrbitalRadius: 72, 
        rotationVelocity: 0,
        orbitalInclination: 1.3,
        axialTilt: 0,
    },
    {
        name: "kasm",
        displayName: "Kasm Workspaces",
        caption: "Workspace streaming platform",
        description: "Stream your workspaces directly to your web browser…on any device and from any location. Each workspace is a different docker container.",
        containerManager: "Docker",
        sourceCode: "https://github.com/orgs/kasmtech/repositories",
        radius: 58232,
        orbitalVelocity: 9.7, 
        orbitObject: "nicolas",
        orbitalRadius: 1433530000, 
        scaledOrbitalRadius: 108, 
        rotationVelocity: 0,
        orbitalInclination: 2.5,
        axialTilt: 0,
    },
    {
        name: "nextcloud",
        displayName: "Nextcloud",
        caption: "Self-hosted cloud storage software",
        description: "Store your documents, calendar, contacts and photos on your server. Access to your data from anywhere.",
        containerManager: "Podman",
        sourceCode: "https://github.com/nextcloud",
        radius: 25362,
        orbitalVelocity: 6.8, 
        orbitObject: "nicolas",
        orbitalRadius: 2870972000, 
        scaledOrbitalRadius: 145, 
        rotationVelocity: 0,
        orbitalInclination: 0.8,
        axialTilt: 0,
    },
    {
        name: "adguard",
        displayName: "Adguard Home",
        caption: "DNS adblocker",
        description: "A DNS filter that blocks domain name resolution for known ads and tracker domain names. Also Adugard can be used to do DNS over HTTPS.",
        containerManager: "Podman",
        sourceCode: "https://github.com/AdguardTeam/AdGuardHome",
        radius: 24622,
        orbitalVelocity: 5.4, 
        orbitObject: "nicolas",
        orbitalRadius: 4514953000, 
        scaledOrbitalRadius: 180, 
        rotationVelocity: 0,
        orbitalInclination: 1.8,
        axialTilt: 0,
    },
    /* - - Services - - */

    /* - - Moons - - */
    {
        name: "sonarqube",
        displayName: "SonarQube",
        caption: "Code security and quality analyzer",
        description: "SonarQube is a code quality and security solution that integrates with DevOps platforms (GitLab in this case) and supports 30+ languages, frameworks and IaC platforms.",
        containerManager: "Podman",
        sourceCode: "https://github.com/SonarSource/sonarqube",
        radius: 1737.5,
        orbitalVelocity: 1.022,
        orbitObject: "gitlab",
        orbitalRadius: 385000,
        scaledOrbitalRadius: 3,
        rotationVelocity: 0,
        orbitalInclination: 5.1,
    }
    // /* - - Sites powered by nginx ? - - */
    // {
    //     name: "io",
    //     displayName: "Io",
    //     caption: "Most volcanic activity",
    //     description: "Io is so volcanically active that it has lakes made of lava. Some of its volcanoes are so powerful, that with a telescope they can be seen from Earth.",
    //     year: "42 hours",
    //     radius: 1821.6,
    //     distance: 262000,
    //     meanTemp: -143,
    //     orbitalVelocity: 17.334,
    //     orbitObject: "jupiter",
    //     orbitalRadius: 262000, 
    //     scaledOrbitalRadius: 10,
    //     rotationVelocity: 0.07,
    //     orbitalInclination: 0.05,
    // },
    // {
    //     name: "europa",
    //     displayName: "Europa",
    //     caption: "Life promising moon",
    //     description: "Europa's subsurface ocean of salty water contains twice as much water as Earth's oceans. It is possible, that beneath its frozen surface exists some form of life.",
    //     year: "85 hours",
    //     radius: 1560.8,
    //     distance: 670900,
    //     minTemp: -220,
    //     maxTemp: -160,
    //     orbitalVelocity: 13.743,
    //     orbitObject: "jupiter",
    //     orbitalRadius: 670900, 
    //     scaledOrbitalRadius: 13,
    //     rotationVelocity: 0.03,
    //     orbitalInclination: 0.47,
    // },
    // {
    //     name: "ganymede",
    //     displayName: "Ganymede",
    //     caption: "Largest moon in the Solar System",
    //     description: "Ganymede is a moon bigger than Mercury. Ganymede has underground oceans and a faint oxygen atmosphere. It is also only moon to have its own magnetic field.",
    //     year: "172 hours",
    //     radius: 2634.1,
    //     distance: 1070400,
    //     minTemp: -180,
    //     maxTemp: -113,
    //     orbitalVelocity: 10.880,
    //     orbitObject: "jupiter",
    //     orbitalRadius: 1070400, 
    //     scaledOrbitalRadius: 15,
    //     rotationVelocity: 0.026,
    //     orbitalInclination: 0.2,
    // },
    // {
    //     name: "callisto",
    //     displayName: "Callisto",
    //     caption: "The long dead moon",
    //     description: "Callisto is the most heavily cratered object in our solar system. It has almost none geologic activity on its surface, but may contain oceans beneath the surface.",
    //     year: "17 days",
    //     radius: 2410.3,
    //     distance: 1883000,
    //     minTemp: -193,
    //     maxTemp: -108,
    //     orbitalVelocity: 8.204,
    //     orbitObject: "jupiter",
    //     orbitalRadius: 1883000, 
    //     scaledOrbitalRadius: 17.5,
    //     rotationVelocity: 0.01,
    //     orbitalInclination: 0.28,
    // },
    // {
    //     name: "titan",
    //     displayName: "Titan",
    //     caption: "Moon with liquids on its surface",
    //     description: "Titan is the only moon in our solar system that has clouds and a dense atmosphere. There are also lakes and oceans on the surface, however they are made of methane and ethane.",
    //     year: "16 days",
    //     radius: 2574.7,
    //     distance: 1221865,
    //     meanTemp: -179,
    //     orbitalVelocity: 5.57,
    //     orbitObject: "saturn",
    //     orbitalRadius: 1221865, 
    //     scaledOrbitalRadius: 16,
    //     rotationVelocity: 0.011,
    //     orbitalInclination: 0.33,
    // },
    // {
    //     name: "triton",
    //     displayName: "Triton",
    //     caption: "The coldest object in Solar system",
    //     description: "Triton is the coldest moon in our solar system. It is also the largest moon that orbits in the opposite direction of its planet's rotation.",
    //     year: "141 hours",
    //     radius: 1353.4,
    //     distance: 354759,
    //     meanTemp: -235,
    //     orbitalVelocity: 4.39,
    //     orbitObject: "neptune",
    //     orbitalRadius: 354759, 
    //     scaledOrbitalRadius: 7,
    //     rotationVelocity: 0.017,
    //     orbitalInclination: 156.885,
    // },
    /* - - Moons - - */
];