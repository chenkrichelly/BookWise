"""Add email field to User model

Revision ID: 7f0d2077a55c
Revises: 9ba86afb127e
Create Date: 2024-01-31 20:35:51.603193

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "7f0d2077a55c"
down_revision: Union[str, None] = "9ba86afb127e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users", sa.Column("email", sa.String(length=100), nullable=True)
    ) 


def downgrade() -> None:
    pass