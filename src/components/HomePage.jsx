import playingKidsPic from "../images/playing-kids.jpg"


export default function HomePage() {
  return (
// full-lg-page
    <div className="bg-peach fs-4 fw-semibold" dir="rtl">
      <h1 className="p-4 text-center">התפתחות הילד</h1>
      <div className="d-flex flex-column flex-lg-row p-2 justify-content-evenly align-items-center ">
        <img src={playingKidsPic} className='col-lg-3 col-11 img-fluid rounded mb-2 m-lg-0' alt="" />
        <div className="border border-dark border-1 border-opacity-50 rounded-1 p-2 col-lg-8">
          <text>
            השנים הראשונות לחייו של תינוק טומנות בחובן התפתחות מהירה בכל תחום אפשרי- ,
          </text>
          <br />
          <text>
            התפתחות שפה התפתחות מוטורית התפתחות החשיבה, התפתחות רגשית חברתית ועוד.
          </text>
          <br />
          <text>
            ידוע לכל כי שנים אלו הן קריטיות. המוח גמיש בשנים אלו, וסופג כספוג
          </text>
          <br />
          <text>
            כל מה שמגישים לו. מסיבה זו חשוב לתת לילד כל מה שהוא צריך ולא להציף בגירויים.
          </text>
          <br />
          <text>
            הורים רבים מוצאים את עצמם מתלבטים בשאלות משמעותיות לגבי גידולו של התינוק.
          </text>
          <br />
          <text>
            מה ומתי הוא מבין? כמה להרים על הידיים ומתי ללמדו לדחות סיפוקים?
          </text>
          <br />
          <text>
            איך מתחילים את הגמילה ממוצץ? את הגמילה מחיתולים?
          </text>
          <br />
          <text>
            מתי לפנות למומחה להתפתחות הילד?
          </text>
        </div>
      </div>
    </div>
  )
}
