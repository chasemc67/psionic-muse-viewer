#!/bin/bash

set -e

# Check if input file is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 input_video_file"
  exit 1
fi

INPUT="$1"
BASENAME=$(basename "$INPUT")
DIRNAME=$(dirname "$INPUT")
EXTENSION="${BASENAME##*.}"
FILENAME="${BASENAME%.*}"

# Get creation_time from ffprobe
CREATION_TIME=$(ffprobe -v quiet -show_entries format_tags=creation_time -of default=noprint_wrappers=1:nokey=1 "$INPUT")

# If no creation_time, warn and exit
if [ -z "$CREATION_TIME" ]; then
  echo "Error: No creation_time metadata found in $INPUT"
  exit 2
fi

# Define output path
OUTPUT="${DIRNAME}/compressed_${FILENAME}.mp4"

# Run ffmpeg to compress and set creation_time
ffmpeg -i "$INPUT" \
  -vf "scale=-2:720" \
  -vcodec libx264 -crf 28 -preset fast \
  -movflags +faststart \
  -metadata creation_time="$CREATION_TIME" \
  "$OUTPUT"

echo "Compressed video saved as $OUTPUT"