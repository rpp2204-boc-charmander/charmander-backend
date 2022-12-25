const axios = require('axios');
const { exerciseList } = require('../__mocks__/exercise');
const request = require('supertest');
const app = require('../app');
const db = require('../db');