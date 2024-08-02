from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Static plot points as mentioned in challenege description
STATIC_POINTS = [
    {"x": 7, "y": 6, "z": 2},
    {"x": 7, "y": 4, "z": 1},
    {"x": 3, "y": 3, "z": 3},
    {"x": 4, "y": 4, "z": 4},
    {"x": 5, "y": 5, "z": 5},
    {"x": 6, "y": 6, "z": 6},
    {"x": 7, "y": 7, "z": 7},
    {"x": 8, "y": 8, "z": 8},
    {"x": 9, "y": 9, "z": 9},
    {"x": 5, "y": 8, "z": 8},
    {"x": 1, "y": 7, "z": 3},
    {"x": 2, "y": 3, "z": 4},
    {"x": 3, "y": 4, "z": 5},
    {"x": 4, "y": 5, "z": 6},
    {"x": 5, "y": 6, "z": 4},
    {"x": 6, "y": 7, "z": 5},
    {"x": 7, "y": 8, "z": 3},
    {"x": 8, "y": 9, "z": 2},
    {"x": 9, "y": 3, "z": 1},
    {"x": 7, "y": 1, "z": 5}
]

# Initialize plot points to static points on server start
plot_points = STATIC_POINTS.copy()

# Once page is refreshed, reinitializing graph points to static points by removing new points
@app.route('/points', methods=['GET'])
def get_points():
    return jsonify(STATIC_POINTS)

@app.route('/plot', methods=['POST'])
def plot_point():
    data = request.get_json()
    x = data.get('x')
    y = data.get('y')
    z = data.get('z')

# Validation stating points must be between 0-10
    if not (0 <= x <= 10 and 0 <= y <= 10 and 0 <= z <= 10):
        return jsonify({"error": "Coordinates must be between 0 and 10"}), 400

    plot_points.append({"x": x, "y": y, "z": z})
    return jsonify({"message": "Point added successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
