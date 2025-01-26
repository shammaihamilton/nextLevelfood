"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import classes from "./meal-item.module.css";
import Button from "@/components/shared/button";
import { useFetchMeal } from "@/hooks/useFetchMeal";

export default function MealItem({ title, slug, imageKey, summary, creator }) {
  const { handleDelete } = useFetchMeal();

  const imageUrl = imageKey;

  const [src, setSrc] = useState(imageUrl);

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.imageContainer}>
          <Image
            src={src}
            alt={`Image of ${title} meal`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onError={() => setSrc("/default-image.jpg")}
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
          <Button onClick={() => handleDelete(slug)}>Delete</Button>
        </div>
      </div>
    </article>
  );
}
