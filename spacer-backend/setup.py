# setup.py
from setuptools import setup, find_packages # type: ignore

setup(
    name='spacer',
    version='0.1.0',
    packages=find_packages(),
    install_requires=[
        'Flask',
        'Flask-SQLAlchemy',
        'Flask-Migrate',
        'Flask-JWT-Extended',
        'Flask-CORS',
        'PyMySQL',
        'python-dotenv',
        'stripe',
        'python-dateutil',
        'bcrypt'
    ],
)