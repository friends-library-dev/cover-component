# overwrite large logos with web-friendly ones
# node will always grab the files from ./dist
mv ./src/Logo{Spanish,Icon,}.tsx .
mv ./src/Logo{.web,}.tsx
mv ./src/LogoSpanish{.web,}.tsx
mv ./src/LogoIcon{.web,}.tsx
