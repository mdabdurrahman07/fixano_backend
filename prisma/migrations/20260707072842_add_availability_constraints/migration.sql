-- AddCheckConstraints
ALTER TABLE "availabilities" 
  ADD CONSTRAINT "availabilities_dayOfWeek_check" 
  CHECK ("dayOfWeek" >= 0 AND "dayOfWeek" <= 6),

  ADD CONSTRAINT "availabilities_time_format_check" 
  CHECK (
    "startTime" ~ '^([0-1][0-9]|2[0-3]):[0-5][0-9]$' AND 
    "endTime" ~ '^([0-1][0-9]|2[0-3]):[0-5][0-9]$'
  ),

  ADD CONSTRAINT "availabilities_chronology_check" 
  CHECK ("endTime" > "startTime");
