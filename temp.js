const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();

  try {
    const data = [
      {
        page: "nollkit",
        content:
          "Hej du Nollan! När du tar dina första steg in på Chalmers är det vi åtta som har planerat fyra veckor med aktiviteter och arrangemang allt för att du ska lära känna din klass bättre och kunna få reda på vad Chalmers som skola har att erbjuda.\nFör att hela denna resan ska gå runt har vi lite olika ansvarsområden som kan läsa om nedan. Vi ser framåt att träffa er alla i augusti!",
      },
      {
        page: "pateter",
        content:
          "På Chalmers är patet ett allmänt namn för personer som tidigare suttit i en förening/kommitté. De som har suttit i just NollKIT tidigare år kallas för NollQIT. De kan vara bra att ha lite då och då, både för NollKIT och för Nollan, eftersom de alltid svarar glatt på frågor om NollKIT råkar vara borta för stunden.",
      },
      {
        page: "mottagningen",
        content:
          "Mottagningen är Chalmeristens fyra första veckor. De består av mängder med händelser och aktiviteter för att du ska lära känna dina klasskamrater, skolan och Göteborg. För många är det nytt att studera högskola och dessutom i en helt ny främmande stad. Mottagningen finns därför ge alla en liten uppstart för det nya livet som väntar en som högskolestudent.",
      },
      {
        page: "modul",
        content:
          "Innan du börjar på Chalmers finns det en hel del att lära sig. Därför har vi skapat Nollmodulen, en liten handbok med massor av nyttig information som kommer vara dig behjälplig, både innan, under och efter mottagningen.",
      },
    ];

    const results = await prisma.pageText.createMany({
      data,
    });

    console.log("Data saved to the database:", results);
  } catch (error) {
    console.error("Error saving data to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
