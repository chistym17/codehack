#!/bin/bash

# Sum of two numbers
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Given two integers A and B, compute their sum.",
    "difficulty": "easy",
    "slug": "sum-of-two-numbers"
  }'

echo -e "\n"

# Prime number check
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Given an integer N, determine if it is a prime number. A prime number is a natural number greater than 1 that is not divisible by any number other than 1 and itself. Print '\''Yes'\'' if the number is prime, otherwise print '\''No'\''.",
    "difficulty": "easy",
    "slug": "prime-number-check"
  }'

echo -e "\n"

# Count vowels
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Given a string S, count the number of vowels (a, e, i, o, u) in the string. The count should be case-insensitive (both uppercase and lowercase vowels should be counted).",
    "difficulty": "easy",
    "slug": "count-vowels"
  }'

echo -e "\n"

# Palindrome check
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Given a string S, determine if it is a palindrome. A palindrome is a string that reads the same backward as forward. Print '\''Yes'\'' if the string is a palindrome, otherwise print '\''No'\''.",
    "difficulty": "easy",
    "slug": "palindrome-check"
  }'

echo -e "\n"

# Average of array
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Given an array of N integers, calculate the average (mean) of all elements in the array. The result should be rounded to 2 decimal places.",
    "difficulty": "easy",
    "slug": "average-of-array"
  }'
