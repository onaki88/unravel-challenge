import { Star } from "lucide-react";
import { cn } from "@/utils";

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export const Rating = ({
  rating,
  maxRating = 5,
  size = 20,
  className,
  showValue = false,
}: RatingProps) => {
  const clampedRating = Math.max(0, Math.min(rating, maxRating));

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const fillPercentage = Math.max(0, Math.min(1, clampedRating - index));
    return { starValue, fillPercentage };
  });

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {stars.map(({ starValue, fillPercentage }) => (
          <div key={starValue} className="relative inline-flex">
            <Star
              size={size}
              className="text-rating-star-empty stroke-muted mr-1"
              strokeWidth={1}
            />

            {fillPercentage > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <Star
                  size={size}
                  className="text-rating-star stroke-muted fill-muted mr-1"
                  strokeWidth={1}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {showValue && (
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
