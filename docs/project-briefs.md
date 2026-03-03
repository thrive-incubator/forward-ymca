
# Forward × YMCA San Diego — Prototype Briefs

**Context**: Three working prototypes to present at the YMCA leadership meeting (Todd Tivis, COO, Chief Development Officer) on the 18th. Goal is to catalyze excitement and get YMCA to commit staff resources and program data access. Strategy: "bring the wrong answer to get the right answer" — provoke productive conversation, not deliver a finished product.

**Design Unity**: All three prototypes share the Forward brand identity — *not* YMCA branding. This signals that Forward is bringing something new, not reskinning what YMCA already has. Shared design tokens: color palette, typography, and the "Every Kid Needs a Team" tagline. Clean, modern, aspirational — the opposite of the current clunky Salesforce-based system.

**Sample Data**: Real San Diego YMCA branches and programs (see data appendix below).

---

## Prototype 1: "Find Your Team" — AI Activity Matcher

### What it is
A conversational interface where a parent or child answers a few fun, low-pressure questions and gets matched to specific YMCA programs with a clear path to sign up. This is the "Amazon shopping cart for youth activities" that Ben described.

### Why it matters for the meeting
This is the crowd-pleaser. It directly contrasts with the current YMCA sign-up experience (which Ann described as requiring a helpdesk call just to pay them money). One side-by-side moment of "here's what it could feel like" will do more than any slide deck.

### User flow

1. **Welcome screen** — warm, inviting. "Let's find the right team for your kid." No login, no forms.

2. **Mode selection** — Two clear options, presented as two large cards or buttons:
   - **"Help Me Choose"** → Guided visual flow (Option A below). Best for parents who want a quick, structured experience.
   - **"Chat With Us"** → AI conversation (Option B below). Best for parents with specific questions, unusual situations, or who just want to talk it through.

#### Option A: Guided Visual Flow

3a. **Conversational Q&A** (3-4 steps, not a form — one question at a time with visual choices):
   - **"How old is your child?"** → Tap an age range (5-6, 7-8, 9-10, 11-12, 13+)
   - **"What sounds fun to them?"** → Visual cards with icons/illustrations: Team Sports (soccer, basketball, flag football), Individual Sports (martial arts, skateboarding, track), Creative Movement (dance), Water Sports (swimming). Allow multi-select.
   - **"What part of San Diego are you in?"** → Map or neighborhood picker (Mission Valley, Encinitas, La Mesa, Point Loma, etc.) — maps to real YMCA branch locations.
   - **Optional: "Has your child been on a team before?"** → Yes / Not yet / Not sure — this is the Forward-specific question. Kids who say "not yet" get a slightly different tone: encouraging, low-commitment options first.

#### Option B: AI Chat

3b. **Chat interface** — a friendly, conversational AI assistant powered by Claude:
   - Opens with a warm greeting: "Hi! I'm here to help find the perfect activity for your kid. Tell me a bit about them — what are they into? How old are they? Anything goes!"
   - The AI asks follow-up questions naturally based on what the parent shares. No rigid script — if a parent says "my 8-year-old is shy and has never done team sports," the AI can empathize and suggest low-pressure options like multi-sport samplers or beginner clinics.
   - The AI has access to the full program catalog (same data as Option A) and can answer questions the guided flow can't: "What's the time commitment like?", "Can siblings be in the same session?", "Is there anything on weekends only?"
   - The conversation is warm, encouraging, and jargon-free. It feels like talking to a helpful friend, not a search engine.
   - At any point, the AI can surface program cards inline in the chat — same visual cards as the guided flow results, with the same sign-up CTA.
   - Fallback: if the AI can't answer something (e.g., specific coach questions), it says so honestly and offers to connect them with a real person.

#### Both paths converge

4. **Results screen** — 2-3 matched programs shown as cards (in the guided flow, shown as a dedicated screen; in the chat flow, surfaced inline when the AI has a recommendation):
   - Program name (e.g., "Coed Soccer League — Division 2, Ages 7-8")
   - Branch name + neighborhood (e.g., "Copley-Price Family YMCA, City Heights")
   - Schedule snapshot (e.g., "Practices Thursdays 5-6pm, Games Saturdays 10am")
   - Price + scholarship note ("Financial assistance available — no kid turned away")
   - Big primary CTA: **"Sign Up"** (mock — leads to confirmation screen)
   - Secondary: "Save for Later" / "See More Options"

5. **Confirmation screen** — "You're in! Here's what happens next." Shows a simple timeline: registration confirmed → coach will contact you → first practice date. Feels like booking a flight, not filling out government paperwork.

### Key design decisions to discuss
- Both options are available — guided cards (safe, predictable, fast) and AI chat (impressive, flexible, conversational). During the demo, show the guided flow first for reliability, then switch to the chat to blow their minds. The two paths reinforce each other: the guided flow shows it *works*, the chat shows it *thinks*.
- The "not yet on a team" path is the Forward differentiator. In the guided flow, it adjusts tone. In the AI chat, it unlocks the real magic — the AI can have a genuine conversation about a child's interests, comfort level, and what "trying something new" could look like.
- How prominent is pricing? Ben mentioned tiered pricing / income-based access. For the demo, keep it simple but visible — show that affordability is baked in.

### Technical notes
- React app, single page with step transitions (no routing needed for guided flow)
- Sample data: hardcode a JSON array of ~15-20 real YMCA SD programs across 4-5 branches
- **Guided flow**: Matching logic is a simple filter by age + interest + location. No AI needed — the UI should *feel* intelligent.
- **AI chat**: Uses Claude API (via backend proxy or edge function) with a system prompt that includes the full program catalog and Forward's tone/philosophy. The AI does real matching and can handle nuanced questions. Keep the system prompt tight — the AI should be warm, encouraging, and focused on getting kids active, not a generic chatbot.
- Mobile-first — this is a phone experience. Demo it on a phone or phone-sized browser window.

---

## Prototype 2: "Every Kid Needs a Team" — QR-to-Signup Landing Experience

### What it is
A marketing-to-action pipeline. Simulates the moment someone watches a TED Talk, scans a QR code, and lands on a beautiful page that takes them from inspiration to signed-up-for-a-program in under 60 seconds. This tells the *ecosystem story* — how Forward's narrative/messaging strategy connects to YMCA's infrastructure.

### Why it matters for the meeting
YMCA leadership knows they can't do aspirational messaging. This shows them they don't have to. Forward handles the inspiration; this prototype shows how that inspiration converts into YMCA enrollments. It also plants the seed for the broader vision: this same flow works for a pediatrician's QR code, an MLB partnership, or a YouTuber's link.

### User flow

1. **Hero landing page** — cinematic, emotional. A full-screen moment.
   - Bold headline: **"Every Kid Needs a Team"**
   - Subtext: "The science is clear: kids who belong to a team are happier, healthier, and more resilient. Let's find yours."
   - One CTA button: **"Find a Team Near Me"** 
   - Below the fold: a brief "Why This Matters" section with 2-3 data points on positive childhood experiences (keep it punchy, not academic). Maybe visual stats or a simple infographic.
   - Optional: "Powered by Forward" badge + "In partnership with YMCA of San Diego County"

2. **Quick match** (compressed version of Prototype 1):
   - Just 2 questions: age + zip code / neighborhood
   - Immediately shows 3-4 nearby programs as beautiful cards
   - Each card has a "Join This Team" button

3. **One-tap signup** (mock):
   - Name + email + child's name. That's it. Three fields.
   - Confirmation: "Welcome to [Program Name]! Your coach will reach out within 48 hours."

### Key design decisions to discuss
- The hero page is doing a LOT of work. It needs to feel like a Nike ad, not a nonprofit homepage. This is where the design investment goes. Think: beautiful photography/illustration of diverse kids playing together, strong typography, motion/parallax.
- Should this feel like it's a Forward page that happens to show YMCA programs? Or a co-branded page? For the meeting, lean Forward-branded — it reinforces that Forward is bringing the cool factor YMCA can't create on its own.
- The "source" of the QR code matters for the story. In the demo, you could print an actual QR code on a mock TED Talk flyer or a fake Instagram post to make the experience tangible. Walk into the meeting, hand them the flyer, have them scan it on their phone.
- The data points section is important for Ben's credibility — cite real PCE research briefly.

### Technical notes
- Single-page HTML or React. Heavy on design, light on logic.
- Parallax scrolling, smooth animations, high-quality imagery (use Unsplash for diverse youth sports photos)
- The QR code should actually work — generate one that points to the hosted prototype
- Mobile-first again. The entire flow should be completable in portrait mode on a phone.

---

## Prototype 3: "Team Builder" — Front Desk Staff Copilot

### What it is
A tablet/kiosk-style tool designed for YMCA front desk staff to use during membership sign-ups. When a family joins the YMCA, the staff member turns the screen around and walks them through finding their first activity — right there, in person, in 2 minutes.

### Why it matters for the meeting
This is the one that hits Jason's (Lehmbeck) point about the last mile. Executives love Prototypes 1 and 2, but the COO will immediately think: "how does this work for my staff?" This answers that question. It also addresses Ann's insight that maybe the first step isn't a perfect digital experience — it's just getting the kid to show up, and a human helps them from there. This prototype embraces that hybrid: tech + human.

### User flow

1. **Staff dashboard** (what the front desk person sees):
   - Simple header: "New Member Activity Finder"
   - Quick-start: "Family just signed up? Let's get them connected."
   - Two modes: 
     - **Guided** (staff turns screen to family): interactive, visual, family-facing
     - **Quick search** (staff uses it themselves): type-ahead search by sport, age, branch

2. **Family-facing guided flow** (designed to be shown on a tablet turned toward the family):
   - Friendly tone: "Welcome to the Y! Let's find something fun for [child's name]."
   - Same 2-3 question flow as Prototype 1, but designed for a tablet on a counter — larger touch targets, bigger text, works in landscape mode
   - Results show with extra staff-relevant info: spots remaining, schedule conflicts with other programs, whether the family's membership tier covers it

3. **Staff confirmation view** (after family picks something):
   - Summary of what was selected
   - "Add to membership" button (mock)
   - Print/email a simple "welcome packet" with: program name, first practice date/time, what to bring, coach contact info
   - Notes field for staff to add context ("Mom mentioned kid is shy — flag for coach")

4. **Staff quick-reference sidebar** (always visible):
   - Current program availability across branch
   - Which programs are filling up
   - Upcoming program start dates
   - "Recommended for first-timers" flag on certain programs

### Key design decisions to discuss
- This is a fundamentally different UX than the other two. It's not consumer-facing marketing — it's an operational tool. The design should be clean and efficient, not cinematic. Think: warm but professional. The family-facing screens should still feel inviting, but the staff views prioritize information density and speed.
- The "notes for coach" feature is a subtle but powerful touch. It connects to Forward's PCE philosophy — coaches who know a kid is new to teams can intentionally create a more welcoming experience. This could be a big talking point with YMCA leadership.
- Landscape tablet orientation for the guided flow. This is used on a counter, not held in hand.
- The "recommended for first-timers" concept is directly from the meeting conversation. Some YMCA programs are better entry points than others. In the demo, flag things like multi-sport samplers, beginner clinics, and rec leagues (vs. competitive leagues).

### Technical notes
- React app, responsive but optimized for tablet landscape (1024×768 as target)
- Two distinct UI modes: staff dashboard (more data-dense) and family-facing flow (more visual/friendly)
- Same underlying program data as Prototype 1, but with additional fields: spots remaining, difficulty/commitment level, "first-timer friendly" tag
- Could use a split-screen approach: staff controls on one side, family-facing display on the other

---

## Shared Design System Notes

**Brand**: Forward (not YMCA). The prototypes should feel like they come from the same family but aren't identical.

**Suggested palette direction**: 
- Primary: a warm, energetic color (think coral/orange territory — active, youthful, not corporate)
- Secondary: a grounding dark (not pure black — something with warmth)
- Accent: a bright, optimistic highlight for CTAs
- Backgrounds: light, airy, lots of whitespace
- Avoid: YMCA red/blue, clinical/healthcare colors, tech-startup purple gradients

**Typography direction**: 
- Display/headlines: something bold and friendly with personality — not geometric/sterile
- Body: highly readable, warm. Not cold sans-serifs.
- Key constraint: must work well on mobile at small sizes

**Imagery**: Diverse kids, ages 6-12, in active/team settings. Joyful, natural, not stock-photo-perfect. Candid > posed. If using illustrations instead of photos, go for a warm, hand-drawn-ish style that feels human.

**Tagline**: "Every Kid Needs a Team" — use consistently across all three prototypes as the unifying thread.

---

## San Diego YMCA Data Appendix

### Branch Locations (use for sample data)

| Branch | Neighborhood | Notes |
|---|---|---|
| Copley-Price Family YMCA | City Heights | Urban, diverse community |
| Jackie Robinson Family YMCA | Southeast SD | Strong sports programming, rugby |
| Mission Valley YMCA | Mission Valley | Large facility, skate park |
| Magdalena Ecke Family YMCA | Encinitas | North county, skate park |
| John A. Davis Family YMCA | La Mesa | East county |
| McGrath Family YMCA | Spring Valley | South/east |
| Rancho Family YMCA | Rancho Peñasquitos | North inland |
| Ryan Family YMCA | Point Loma | Coastal |
| Border View Family YMCA | Otay Mesa West | South county |
| South Bay Family YMCA | Chula Vista | South bay |
| Mottino Family YMCA | Oceanside | North county |
| Escondido YMCA | Escondido | Inland north, gymnastics center |
| Toby Wells YMCA | Kearny Mesa | Central |
| Cameron Family YMCA | Santee | East county |

### Sample Youth Sports Programs (ages 6-12 focus)

| Sport | Age Divisions | Schedule Pattern | Branch Availability |
|---|---|---|---|
| Soccer (rec league) | 5-7, 8-9, 10-14 | Practice weekdays, games Sat | Multiple branches |
| Basketball (rec league) | 5-6, 7-8, 9-10, 11-12 | Practice weekdays, games Sat | Multiple branches |
| Flag Football (clinic) | Beginner-advanced | 4-week sessions | Select branches |
| Volleyball (clinic) | 5-8, 8-14 | Weekly 1-hour sessions | Select branches |
| Volleyball (league) | 8-14, 10-17 | Practice + games weekly | Select branches |
| Rugby | 7-14 | Varies | Jackie Robinson only |
| T-Ball (Padres Rookie) | 3-5 (peewee), 5-7 | Saturday games | Multiple branches |
| Track & Field | Youth | Varies | Select branches |
| Martial Arts | All ages | Ongoing enrollment | Multiple branches |
| Skateboarding | All ages | Lessons + open skate | Mission Valley, Encinitas |
| Dance | Beginner-advanced | Weekly classes | Select branches |
| Multi-sport camps | 6-12 | Summer/break day camps | Multiple branches |

### Pricing Reference
- Family membership: ~$118-139/month (varies by tier)
- Teen membership: ~$48-52/month
- Program fees: vary by sport/session
- Scholarship program available — "no kid turned away" policy
- San Diego Wave FC partnership for soccer jerseys

### Key Messaging Points (for content in prototypes)
- YMCA SD serves 14 branch locations across the county
- Already shifting toward recreational sports accessibility
- Part of national $1B campaign for positive youth development
- Coaches can be trained to intentionally deliver positive childhood experiences
- Partnership with San Diego Wave FC (soccer), San Diego Seals (lacrosse), Padres (T-ball)

---

## Presentation Strategy

**Order of demo**: Lead with Prototype 2 (the story/vision), then Prototype 1 (the consumer magic), then Prototype 3 (the operational reality). This takes them from "wow, what a vision" to "wow, this is real" to "wow, this works for my staff."

**Physical prop**: Print a QR code on a card or flyer for Prototype 2. Hand it to Todd at the start. "Scan this." Let the experience speak first, then explain.

**The "wrong answer" setup**: After demoing, explicitly say: "We know this isn't right yet. What did we get wrong? What would make this work for your team?" This invites the YMCA staff perspective that Jason flagged as critical.

**Funding hook**: Ben tells them the solution development is funded. Their only investment is staff time and data access. Hard to say no.
