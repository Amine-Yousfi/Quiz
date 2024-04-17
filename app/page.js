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
              fontSize: "45px",
            }}
          >
            Musée Quiz App
          </h1>
          <img src="Red.png" style={{ maxWidth: "10%" }} />
        </div>

        <br />
        <hr
          style={{
            color: "brown",
          }}
        />
        <div
          style={{
            fontFamily: "cursive",
          }}
        >
          <h1>Apprenons ensemble</h1>
          <h2>mieux</h2>
          <h2>À propos des animaux</h2>
        </div>
        <img
          src="animal.jpg"
          alt="Animal Image"
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
            Commencer Quiz
          </button>
        </Link>
      </div>
    </main>
  );
}
