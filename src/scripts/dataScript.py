import csv
import json

with open("src/assets/gator-data.csv", mode = 'r') as file:
    csvFile = csv.reader(file)
    entries = []
    for index, lines in enumerate(csvFile):
        if index == 0:
            continue

        name = lines[1]
        degree = lines[2]
        room = lines[3]
        country = lines[4]

        entry = {
            'name': name,
            'degree': degree,
            'room': room,
            'country': country
        }

        entries.append(entry)
        print(f"Index: {index}, Name: {name}, Degree: {degree}, Room: {room}, Country: {country}")

        with open("src/assets/gator-data.json", mode = 'w') as jsonFile:
            json.dump(entries, jsonFile, indent = 4)


with open("src/assets/faculty-data.csv", mode = 'r') as file:
    csvFile = csv.reader(file)
    facultyMap = dict()
    for index, lines in enumerate(csvFile):
        if index == 0:
            continue

        degree = lines[0].strip().lower()
        faculty = lines[1]

        if facultyMap.get(faculty) is not None:
            if degree not in facultyMap[faculty]:
                facultyMap[faculty].append(degree)
        else:
            facultyMap[faculty] = [degree]
        print(f"Index: {index}, Faculty: {faculty}, Degree: {degree}")

        facultyValues = list(facultyMap.items())

        facultyOutput = {
            'dataType': 'Map',
            'value': facultyValues
        }

        with open("src/assets/faculty-data.json", mode = 'w') as jsonFile:
            json.dump(facultyOutput, jsonFile, indent = 4)
    for lines in csvFile:
        print(lines)