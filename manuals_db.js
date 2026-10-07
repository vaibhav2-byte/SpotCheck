// Machine Manuals Knowledge Base (Hammer Strength, Life Fitness, TechnoGym, Rogue Fitness)
// Optimized for Low-Latency Mobile RAG Indexing & Fast Retrieval

export const GYM_MANUALS_DB = [
  {
    id: "hammer-strength-iso-lat-pulldown",
    name: "Hammer Strength Iso-Lateral Front Lat Pulldown",
    brand: "Hammer Strength",
    category: "Back / Pull",
    manualRef: "Hammer Strength Ground Base & Iso-Lateral Manual DOC-ILPD-REV4, Page 12",
    aliases: [
      "hammer strength lat pulldown",
      "front lat pulldown",
      "iso lateral pulldown",
      "plate loaded pulldown",
      "lat pull hammer"
    ],
    seatTip: "Adjust seat height with **Yellow Pop-Pin #1** so thigh rollers lock thighs firmly down with feet flat on the floor; arms should reach full upward extension without hips lifting.",
    steps: [
      "**Pull yellow seat pop-pin #1** and adjust seat height so your chest is erect and feet rest flat on the rubber platform.",
      "**Pull yellow thigh roller pin #2** to clamp pads snugly over quadriceps to prevent lifting during heavy loads.",
      "Select weight plates, grip diverging handles with underhand or neutral grip, and keep chest high against the pad."
    ],
    primaryMuscles: ["latissimus_dorsi"],
    secondaryMuscles: ["biceps", "posterior_deltoids", "rhomboids"],
    keyPins: [
      { name: "Seat Pop-Pin #1", role: "Seat Height (level 1-6)", color: "#FFD000" },
      { name: "Thigh Roller Pin #2", role: "Thigh Clamp Tightness", color: "#FFD000" }
    ],
    manualExcerpt: `SECTION 4.2 - ISO-LATERAL FRONT LAT PULLDOWN SETUP:
1. Always adjust seat height FIRST before loading weight plates. The user's feet must remain flat on the platform.
2. Thigh hold-down roller adjustment: Grasp the yellow pull-pin located beneath the thigh pad cushion. Disengage pin, move roller arm down until cushions firmly contact upper thighs, then release pin into the nearest detent hole.
3. Seat height adjustment: Disengage yellow pop-pin beneath seat carriage. Raise or lower seat until arms can reach full upward extension while seated. Ensure pin clicks securely into place.
4. Movement Execution: Grip independent handles. Pull down and slightly back along the diverging arc of motion. Do not lean torso back excessively.`
  },
  {
    id: "life-fitness-seated-leg-curl",
    name: "Life Fitness Signature Series Seated Leg Curl",
    brand: "Life Fitness",
    category: "Hamstrings / Lower Body",
    manualRef: "Life Fitness Signature Series Selectorized Manual 8489901-AA, Page 28",
    aliases: [
      "seated leg curl",
      "pin selected leg curl",
      "life fitness leg curl",
      "hamstring curl machine",
      "pin loaded leg curl"
    ],
    seatTip: "Align knee joint axis of rotation exactly with the machine's red pivot hub; adjust back pad with **Yellow Thumb-Latch #1** to prevent sliding.",
    steps: [
      "**Press yellow back-pad lever #1** to slide backrest until knee pivot axis aligns directly with the red hub indicator.",
      "**Pull yellow tibia-roller pin #2** to position lower pad just above Achilles tendon/heels.",
      "**Lower yellow thigh-clamp lever #3** firmly over thighs to eliminate hip lift, then insert stack weight pin."
    ],
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["calves", "glutes"],
    keyPins: [
      { name: "Back-Pad Lever #1", role: "Knee Axis Alignment", color: "#FFD000" },
      { name: "Tibia Roller Pin #2", role: "Lower Leg Pad Position", color: "#FFD000" },
      { name: "Thigh Clamp Lever #3", role: "Thigh Hold-Down Lock", color: "#FFD000" }
    ],
    manualExcerpt: `SECTION 3.8 - SIGNATURE SERIES SEATED LEG CURL (SS-SLC):
1. Seat back alignment: Sit upright. Use thumb lever to slide back pad forward or backward until the lateral condyle of the knee aligns with the red rotational axis indicator.
2. Ankle/Tibia pad adjustment: Pull yellow pull-pin on lever arm. Position roller pad against posterior lower leg just proximal to Achilles tendon.
3. Thigh restraint: Pull yellow lever on the top thigh pad and press down firmly against upper thighs. This stabilizes femur and isolates hamstring recruitment.
4. Stack selection: Insert magnetic selector pin fully into desired weight increment.`
  },
  {
    id: "life-fitness-chest-press",
    name: "Life Fitness Signature Series Chest Press",
    brand: "Life Fitness",
    category: "Chest / Push",
    manualRef: "Life Fitness Signature Series Selectorized Manual 8489901-AA, Page 14",
    aliases: [
      "life fitness chest press",
      "selectorized chest press",
      "seated chest press",
      "pin chest press machine"
    ],
    seatTip: "Adjust seat height with **Yellow Under-Seat Lever #1** so horizontal press handles align with mid-chest (nipple line).",
    steps: [
      "**Lift yellow under-seat lever #1** until handles align horizontally with mid-sternum level.",
      "**Pull yellow start-position pin #2** to adjust starting depth for a comfortable chest stretch without shoulder strain.",
      "Insert magnetic weight stack pin, plant feet firmly, retract scapulae into back pad, and push smoothly."
    ],
    primaryMuscles: ["pectorals"],
    secondaryMuscles: ["anterior_deltoids", "triceps"],
    keyPins: [
      { name: "Under-Seat Lever #1", role: "Handle-to-Chest Height", color: "#FFD000" },
      { name: "Start-Position Pin #2", role: "Shoulder Pre-Stretch Depth", color: "#FFD000" }
    ],
    manualExcerpt: `SECTION 3.2 - SIGNATURE CHEST PRESS (SS-CP):
1. Seat height adjustment: While seated, lift yellow release lever under front of seat. Elevate or depress seat until horizontal grips align with mid-sternum.
2. Range of Motion (ROM) selector: Disengage yellow overhead pin to choose pre-stretch starting depth. Position 1 provides maximum stretch; Position 4 allows restricted range for rehabilitation.
3. Scapular retraction: Keep shoulder blades pressed back into pad and elbows slightly below shoulder plane during press phase.`
  },
  {
    id: "technogym-pure-hack-squat",
    name: "TechnoGym Pure Strength Hack Squat",
    brand: "TechnoGym",
    category: "Legs / Quads",
    manualRef: "TechnoGym Pure Strength User & Maintenance Manual 0SM00779, Page 44",
    aliases: [
      "technogym hack squat",
      "hack squat machine",
      "pure strength hack squat",
      "plate loaded squat"
    ],
    seatTip: "Adjust platform with **Footplate Incline Cam #2** and ensure **Yellow Safety Release Handles #1** are disengaged when shoulders are locked under pads.",
    steps: [
      "Step onto footplate, tuck shoulders under pads, and prepare **Yellow Safety Release Handles #1**.",
      "Extend knees slightly to lift carriage, rotate the **Yellow Safety Release Handles #1** outward to unlock rack stops.",
      "Descend to 90-degree knee flexion ensuring heels remain glued to platform, then re-engage **Yellow Safety Stops #1** upon set completion."
    ],
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "calves"],
    keyPins: [
      { name: "Safety Release Handles #1", role: "Carriage Lock/Unlock", color: "#FFD000" },
      { name: "Footplate Incline Cam #2", role: "Ankle Dorsiflexion Angle", color: "#FFD000" }
    ],
    manualExcerpt: `SECTION 5.4 - PURE HACK SQUAT (PG09):
1. Foot position: Position feet mid-to-high on the textured platform, approximately shoulder-width.
2. Shoulder pad engagement: Rest shoulder cushions squarely across upper trapezius. Grip rubberized handles at hip level.
3. Unlocking carriage: Press carriage up 1-2 cm, rotate lateral yellow handles outwards until safety hooks clear safety pins.
4. Execution: Lower weight under controlled eccentric tempo until knees attain 90° angle. Press smoothly through whole foot.`
  },
  {
    id: "rogue-seated-cable-row",
    name: "Rogue Monster Seated Cable Low Row",
    brand: "Rogue",
    category: "Back / Pull",
    manualRef: "Rogue Monster Series Lat Pulldown / Low Row Manual RA-MN-LP-01, Page 9",
    aliases: [
      "rogue low row",
      "rogue cable row",
      "seated low row",
      "monster seated row",
      "cable row machine"
    ],
    seatTip: "Adjust chest support pad using **Detent Quick-Pin #1** so arms achieve full stretch without rounding lower back.",
    steps: [
      "**Pull red detent quick-pin #1** on chest pad column to set torso brace angle at upright 90°.",
      "**Adjust footplate locator pin #2** so knees maintain a soft 10° athletic bend when gripping row handle.",
      "Select pin weight, brace core against pad, drive elbows backward tight to ribs, and control the eccentric return."
    ],
    primaryMuscles: ["latissimus_dorsi", "rhomboids"],
    secondaryMuscles: ["biceps", "trapezius", "erector_spinae"],
    keyPins: [
      { name: "Detent Quick-Pin #1", role: "Chest Support Distance", color: "#FF3B30" },
      { name: "Footplate Locator Pin #2", role: "Leg Extension Length", color: "#FF3B30" }
    ],
    manualExcerpt: `ROGUE MONSTER LOW ROW SETUP INSTRUCTIONS:
1. Footplate Setup: Ensure non-slip footpads are locked into frame slots with knurled selector pins fully engaged.
2. Chest Pad Alignment: Set pad distance using pop-pin so chest meets cushion firmly when torso is perpendicular to ground.
3. Grasp V-handle or straight bar. Keep chest proud, drive through heels, retract scapula first before bending elbows.`
  },
  {
    id: "hammer-strength-incline-press",
    name: "Hammer Strength Iso-Lateral Incline Press",
    brand: "Hammer Strength",
    category: "Chest / Push",
    manualRef: "Hammer Strength Ground Base & Iso-Lateral Manual DOC-ILIP-REV3, Page 8",
    aliases: [
      "hammer strength incline press",
      "incline chest press hammer",
      "iso lateral incline",
      "plate loaded incline press"
    ],
    seatTip: "Adjust seat height with **Yellow Pop-Pin #1** so converging press horns start at upper pectoral level.",
    steps: [
      "**Pull yellow seat pop-pin #1** to adjust seat height so grip handles align with upper clavicular head of chest.",
      "Load Olympic plates onto independent horn sleeves for bilateral or alternating unilateral reps.",
      "Sit tall, pin shoulder blades back, grasp neutral or wide handles, and press along natural converging arc."
    ],
    primaryMuscles: ["upper_pectorals", "anterior_deltoids"],
    secondaryMuscles: ["triceps"],
    keyPins: [
      { name: "Seat Pop-Pin #1", role: "Vertical Seat Height", color: "#FFD000" }
    ],
    manualExcerpt: `SECTION 4.1 - ISO-LATERAL INCLINE PRESS:
1. Adjust seat carriage: Grasp yellow pop-pin beneath seat cushion. Align body so hand grips rest slightly above nipple level (across clavicular margin).
2. Plate loading: Load plates equally on both left and right horns or use independently.
3. Grip and wrist angle: Grip handles firmly with wrists stacked over elbows. Press along the natural diverging/converging path.`
  },
  {
    id: "technogym-selection-leg-extension",
    name: "TechnoGym Selection 900 Leg Extension",
    brand: "TechnoGym",
    category: "Legs / Quads",
    manualRef: "TechnoGym Selection 900 User Manual MK01-EN, Page 31",
    aliases: [
      "technogym leg extension",
      "selection leg extension",
      "quadriceps extension",
      "pin leg extension"
    ],
    seatTip: "Align knee joint with the yellow indicator axis on the cam pivot; adjust backrest so back is flush without slouching.",
    steps: [
      "**Pull yellow backrest lever #1** so popliteal fossa (back of knees) clears the seat edge by 1 inch.",
      "**Adjust yellow shin roller pin #2** so pad rests directly across the lower tibia just above ankle crease.",
      "**Set yellow ROM limit pin #3** to starting angle (90°), grip side handles, and extend legs smoothly."
    ],
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["calves"],
    keyPins: [
      { name: "Backrest Lever #1", role: "Knee Axis Clearance", color: "#FFD000" },
      { name: "Shin Roller Pin #2", role: "Tibia Pad Height", color: "#FFD000" },
      { name: "ROM Limit Pin #3", role: "Starting Arc Angle", color: "#FFD000" }
    ],
    manualExcerpt: `SELECTION 900 LEG EXTENSION (MK01):
1. Backrest positioning: Pull yellow back lever; align lateral epicondyle of femur with center of the yellow pivot circle on cam.
2. Shin pad: Disengage yellow pin on lower swing arm. Rest roller cushion directly above lateral malleolus (ankle joint).
3. Range of motion: Use yellow cam pin to adjust starting stretch. Execute knee extension smoothly without jerking hips.`
  },
  {
    id: "life-fitness-standing-calf-raise",
    name: "Life Fitness Signature Standing Calf Raise",
    brand: "Life Fitness",
    category: "Calves / Lower Body",
    manualRef: "Life Fitness Signature Series Manual 8489901-AA, Page 37",
    aliases: [
      "standing calf raise",
      "life fitness calf raise",
      "standing calf machine",
      "calf raise selectorized"
    ],
    seatTip: "Adjust shoulder pad height with **Yellow Spring-Pin #1** so knees are slightly bent when standing on step block.",
    steps: [
      "**Pull yellow spring-pin #1** to adjust dual shoulder pads so you stand upright with a slight knee unlock.",
      "Place balls of feet on non-skid curved edge block, dropping heels down for a full calf stretch.",
      "Disengage safety stop lever, drive through balls of feet into full plantarflexion, pausing 1 second at top."
    ],
    primaryMuscles: ["calves"],
    secondaryMuscles: ["hamstrings"],
    keyPins: [
      { name: "Shoulder Pad Spring-Pin #1", role: "Shoulder Carriage Height", color: "#FFD000" },
      { name: "Safety Stop Lever #2", role: "Pre-Lift Safety Rest", color: "#FFD000" }
    ],
    manualExcerpt: `SECTION 3.12 - SIGNATURE STANDING CALF (SS-SCR):
1. Shoulder pad adjustment: Pull yellow pin on center column. Adjust shoulder pads so user stands under pads with knees flexed 10-15 degrees.
2. Execution: Stand with balls of feet centered on foot plate. Straighten legs slightly to clear safety stop, rotate safety handle outward.
3. Lower heels below plate level for full stretch, then elevate onto toes through full plantarflexion.`
  }
];
