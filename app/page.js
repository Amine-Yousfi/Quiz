import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "cursive",
              fontSize:"45px"
            }}
          >
            Scrum Quiz App
          </h1>
          <img src="Red.png" style={{ maxWidth: "10%" }} />
        </div>

        <br />
        <hr
          style={{
            color: "brown",
          }}
        />
        <div style={{
          fontFamily:"cursive"
        }}>
          <h1>Let's learn</h1>
          <h2>new concepts</h2>
          <h2>about Scrum</h2>
        </div>
        <img
          src="scrum.jpg"
          alt="Scrum Image"
          style={{
            maxWidth: "60%",
            height: "auto",
            marginLeft: "10%",
            borderRadius: "5%",
          }}
        />
        <Link href="/quiz">
          <button
            style={{
              fontFamily: "cursive",
              fontWeight: "bold",
            }}
          >
            Start Quiz
          </button>
        </Link>
      </div>
    </main>
  );
}
