import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/services/APImeals";
import { notFound } from "next/navigation";

export default async function MealDetailsPage({ params }) {
  if (!params || !params.slug) {
    throw new Error("Slug is required to fetch the meal details.");
  }

  const meal = await getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://shammaihamilton-user-nextjs-demo-images.s3.eu-north-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
