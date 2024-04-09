"""Change hashed_password length

Revision ID: 9ba86afb127e
Revises: 
Create Date: 2024-01-31 19:54:21.705560

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9ba86afb127e'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.alter_column(
        'users', 'hashed_password', type_=sa.String(length=150)
    )

def downgrade() -> None:
    pass
