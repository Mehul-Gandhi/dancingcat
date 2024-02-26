import re
from typing import List

import requests

from config import Config


LOCATIONS = [
    "SJACC",
    "TCH",
    "TDC",
    "CCPH",
    "SVACA",
]


class Animal:
    FIELDS = [
        "animalID",
        "animalName",
        "animalSpecies",
        "animalSex",
        "animalStatus",
        "animalBreed",
        "animalColor",
        "animalAltered",
        "animalBirthdate",
        "animalPictures",
        "animalRescueID",
    ]

    def __init__(self, data):
        self._data = data

    @property
    def id(self) -> int:
        return int(self._data['animalID'])

    @property
    def name(self) -> str:
        return self._data['animalName']

    @property
    def sex(self) -> str:
        return self._data['animalSex']

    @property
    def status(self) -> str:
        return self._data['animalStatus']

    @property
    def breed(self) -> str:
        return self._data['animalBreed']

    @property
    def color(self) -> str:
        return self._data['animalColor']

    @property
    def altered(self) -> str:
        return self._data['animalAltered']

    @property
    def birthday(self) -> str:
        return self._data['animalBirthdate']

    @property
    def rescueId(self) -> str:
        return self._data['animalRescueID']

    @property
    def picture_url(self) -> str:
        pictures = self._data['animalPictures']
        pictures.sort(key=lambda x: int(x['mediaOrder']))
        if not pictures:
            return ""
        return pictures[0]['large']['url']

    @property
    def breedColor(self) -> str:
        if self.color:
            return f"{self.breed} / {self.color}"
        else:
            return self.breed


class JournalEntry: # returns Journal Entry information
    FIELDS = [
        "journalEntryID",
        "journalEntryDate",
        "journalEntryComment",
        "journalEntrytypeDescription",
        "journalEntryDueDate"
    ]

    def __init__(self, data):
        self._data = data

        # Extract the comment and location.
	# The location indicates where the service in the JE was done.
        comment = self._data['journalEntryComment']
        # Remove leading initials if present
	# JEs are formated as follows:
	# II: text
	# where II is the initials of the person creating the JE; could be 2 or 3 characters
        match = re.search(r"[A-Za-z]{2,3}:? (.+)", comment, re.DOTALL)
        comment = match.group(1) if match else comment
        comment = comment.strip()
        self._comment = comment
        self._location = ""
        for location in LOCATIONS:
            if comment.startswith(location):
                comment = comment[len(location):].strip()
                self._location = location
                break
            elif comment.startswith("at " + location):
                comment = comment[len("at " + location):].strip()
                self._location = location
                break
            elif comment.startswith("@" + location):
                comment = comment[len("@" + location):].strip()
                self._location = location
                break
            elif comment.endswith("@" + location):
                comment = comment[:-len("@" + location)].strip()
                self._location = location
                break
            elif comment.endswith("@ " + location):
                comment = comment[:-len("@ " + location)].strip()
                self._location = location
                break
        if not self._location and comment.startswith("at "):
            match = re.search(r"^at ([A-Za-z]+)(.*)$", comment, re.DOTALL)
            if match:
                self._location = match.group(1)
                comment = match.group(2).strip()
                if comment.startswith("'s"):
                    comment = comment[2:].strip()
        self._short_comment = comment

    @property
    def id(self) -> int:
        return int(self._data['journalEntryID'])

    @property
    def date(self) -> str:
        return self._data['journalEntryDate']

    @property
    def type_description(self) -> str:
        return self._data['journalEntrytypeDescription']

    @property
    def comment(self) -> str:
        return self._comment

    @property
    def short_comment(self) -> str:
        return self._short_comment

    @property
    def location(self) -> str:
        return self._location

    @property
    def due_date(self) -> str:
        return self._data['journalEntryDueDate'] if 'journalEntryDueDate' in self._data else ""


class RescueGroupsAPI:
    def __init__(self):
        self._auth = None
        self._auth = self._login()

    def _request(self, data: dict):
        if self._auth:
            data['token'] = self._auth['token']
            data['tokenHash'] = self._auth['tokenHash']
        response = requests.post("https://api.rescuegroups.org/http/v2.json", json=data)
        response.raise_for_status()
        result = response.json()
        if result['status'] != "ok":
            print(result)
            raise Exception()
        return result['data']

    def _login(self):
        auth_req = {
            "action": "login",
            "username": Config.RESCUE_GROUPS_USERNAME,
            "password": Config.RESCUE_GROUPS_PASSWORD,
            "accountNumber": Config.RESCUE_GROUPS_ACCOUNT_NUMBER,
        }
        return self._request(auth_req)

    def search(self, name: str) -> List[Animal]:
        req = {
            "objectType": "animals",
            "objectAction": "search",
            "search": {
                "resultStart": "0",
                "resultLimit": "30",
                "resultSort": "animalCreatedDate",
                "resultOrder": "asc",
                "filters": [
                    {
                        "fieldName": "animalName",
                        "operation": "contains",
                        "criteria": name,
                    },
                    {
                        "fieldName": "animalOthernames",
                        "operation": "contains",
                        "criteria": name,
                    }
                ],
                "filterProcessing": "1 or 2",
                "fields": Animal.FIELDS,
            },
        }
        return [Animal(x) for x in (self._request(req) or {}).values()]

    def animal(self, id: int) -> List[Animal]:
        req = {
            "objectType": "animals",
            "objectAction": "view",
            "values": [ { "animalID": id } ],
            "fields": Animal.FIELDS,
        }
        return Animal(self._request(req)[0])

    def journal_entries(self, animal_id) -> List[JournalEntry]: # given an animal ID, returns list of JEs
        req = {
            "objectType": "animalsJournalEntries",
            "objectAction": "search",
            "search": {
                "resultStart": "0",
                "resultLimit": "200",
                "resultSort": "journalEntryDate",
                "resultOrder": "asc",
                "filters": [
                    {
                        "fieldName": "journalEntryAnimalID",
                        "operation": "equals",
                        "criteria": animal_id,
                    }
                ],
                "filterProcessing": "1",
                "fields": JournalEntry.FIELDS
            },
        }
        return [JournalEntry(x) for x in (self._request(req) or {}).values()]
